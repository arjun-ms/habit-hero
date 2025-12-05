from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from fastapi.middleware.cors import CORSMiddleware

from database import create_db_and_tables, get_session
from models import Habit, HabitLog
from schemas import (
    HabitCreate,
    HabitRead,
    HabitLogCreate,
    HabitLogRead,
    HabitUpdate
)
import crud

from ai import suggest_from_existing, suggest_from_goals

from fastapi.responses import FileResponse
from pdf_utils import create_habit_report
import os

from pydantic import BaseModel
class ExistingHabitsPayload(BaseModel):
    habits: list

class NotesRequest(BaseModel):
    habit_id: int

class GoalsPayload(BaseModel):
    goals: str

from ai import generate_motivation, analyze_notes

app = FastAPI(title="Habit Hero API - MVP")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Run once at startup to create DB
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Habit Hero API is running!"}

# ----------------------------------------------------
# HABIT ROUTES
# ----------------------------------------------------

@app.post("/habits", response_model=HabitRead)
def create_habit(habit_data: HabitCreate, session: Session = Depends(get_session)):
    habit = Habit(**habit_data.dict())
    saved = crud.create_habit(session, habit)
    return saved


@app.get("/habits", response_model=list[HabitRead])
def get_habits(session: Session = Depends(get_session)):
    return crud.get_habits(session)


@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int, session: Session = Depends(get_session)):
    success = crud.delete_habit(session, habit_id)
    if not success:
        raise HTTPException(status_code=404, detail="Habit not found")
    return {"message": "Habit deleted"}

@app.put("/habits/{habit_id}", response_model=HabitRead)
def update_habit(habit_id: int, habit_data: HabitUpdate, session: Session = Depends(get_session)):
    data = habit_data.dict(exclude_unset=True)
    updated = crud.update_habit(session, habit_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Habit not found")
    return updated

# ----------------------------------------------------
# HABIT LOG ROUTES
# ----------------------------------------------------

@app.post("/logs", response_model=HabitLogRead)
def create_log(log_data: HabitLogCreate, session: Session = Depends(get_session)):
    log = HabitLog(**log_data.dict())
    saved = crud.create_log(session, log)
    return saved


@app.get("/habits/{habit_id}/logs", response_model=list[HabitLogRead])
def get_logs(habit_id: int, session: Session = Depends(get_session)):
    return crud.get_logs_for_habit(session, habit_id)


@app.delete("/logs/{log_id}")
def delete_log(log_id: int, session: Session = Depends(get_session)):
    log = session.get(HabitLog, log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    session.delete(log)
    session.commit()
    return {"message": "Log deleted"}


#- HABITS ANALYTICS

@app.get("/habits/{habit_id}/analytics")
def habit_analytics(habit_id: int, session: Session = Depends(get_session)):
    logs = crud.get_logs_for_habit(session, habit_id)
    analytics = crud.compute_analytics(logs)
    return analytics


#############
#- MOTIVATION
##############

@app.post("/motivation")
async def motivation(payload: dict):
    habit = payload.get("habit")
    category = payload.get("category")
    notes = payload.get("notes", "")

    text = await generate_motivation(habit, category, notes)

    return {"motivation": text}

# ---------------------------
# AI Suggestion Routes
# ---------------------------

@app.post("/suggest/existing")
async def suggest_existing(payload: ExistingHabitsPayload):
    text = await suggest_from_existing(payload.habits)
    return {"suggestion": text}


@app.post("/suggest/goals")
async def suggest_goals(payload: GoalsPayload):
    text = await suggest_from_goals(payload.goals)
    return {"suggestion": text}


# ANALYSE NOTES

@app.post("/analyze-notes")
async def analyze_notes_endpoint(payload: NotesRequest, session: Session = Depends(get_session)):
    try:
        habit_id = payload.habit_id

        logs = crud.get_logs_for_habit(session, habit_id)

        if not logs:
            raise HTTPException(status_code=400, detail="No logs found for this habit.")

        notes = [log.note for log in logs if log.note]

        if not notes:
            raise HTTPException(status_code=400, detail="No notes found in logs for this habit.")

        result = await analyze_notes(notes)
        return result
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"Error analyzing notes: {str(e)}\n{error_details}")


#- REPORTS
@app.get("/habit/{habit_id}/report")
def generate_report(habit_id: int, session: Session = Depends(get_session)):

    habit = crud.get_habit(session, habit_id)
    logs = crud.get_logs_for_habit(session, habit_id)
    analytics = crud.get_analytics(habit_id, session)

    filename = f"habit_{habit_id}_report.pdf"
    
    import tempfile
    import os

    tmp_dir = tempfile.gettempdir()
    filepath = os.path.join(tmp_dir, f"habit_{habit_id}_report.pdf")


    create_habit_report(habit, logs, analytics, filepath)

    return FileResponse(filepath, media_type="application/pdf", filename=filename)


#- BADGES

@app.get("/habit/{habit_id}/badges")
def habit_badges(habit_id: int, session: Session = Depends(get_session)):
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(404)

    logs = crud.get_logs_for_habit(session, habit_id)
    analytics = crud.get_analytics(habit_id, session)
    badges = crud.get_badges(habit, logs, analytics)

    return {"xp": habit.xp, "badges": badges}
