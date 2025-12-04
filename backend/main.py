from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session

from database import create_db_and_tables, get_session
from models import Habit, HabitLog
from schemas import (
    HabitCreate,
    HabitRead,
    HabitLogCreate,
    HabitLogRead
)
import crud


app = FastAPI(title="Habit Hero API - MVP")


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


#- HABITS ANALYTICS

@app.get("/habits/{habit_id}/analytics")
def habit_analytics(habit_id: int, session: Session = Depends(get_session)):
    logs = crud.get_logs_for_habit(session, habit_id)
    analytics = crud.compute_analytics(logs)
    return analytics