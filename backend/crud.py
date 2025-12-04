# backend/crud.py

from typing import List
from sqlmodel import Session, select

from models import Habit, HabitLog

from datetime import timedelta

# -----------------------------------
# HABIT CRUD
# -----------------------------------

def create_habit(session: Session, habit: Habit) -> Habit:
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


def get_habits(session: Session) -> List[Habit]:
    statement = select(Habit)
    results = session.exec(statement)
    return results.all()


def get_habit(session: Session, habit_id: int) -> Habit | None:
    return session.get(Habit, habit_id)


def delete_habit(session: Session, habit_id: int) -> bool:
    habit = session.get(Habit, habit_id)
    if not habit:
        return False
    session.delete(habit)
    session.commit()
    return True


# -----------------------------------
# HABIT LOG CRUD
# -----------------------------------

def create_log(session: Session, log: HabitLog) -> HabitLog:
    session.add(log)
    session.commit()
    session.refresh(log)
    return log


def get_logs_for_habit(session: Session, habit_id: int) -> List[HabitLog]:
    statement = select(HabitLog).where(HabitLog.habit_id == habit_id)
    results = session.exec(statement)
    return results.all()


# -----------------------------------
# analytics functions
# -----------------------------------

def compute_analytics(logs):
    if not logs:
        return {
            "current_streak": 0,
            "longest_streak": 0,
            "success_rate": 0.0,
            "best_days": []
        }

    # Sort logs by date
    logs = sorted(logs, key=lambda x: x.log_date)

    # --- STREAKS ---
    longest_streak = 1
    current_streak = 1

    for i in range(1, len(logs)):
        if logs[i].log_date == logs[i-1].log_date + timedelta(days=1):
            current_streak += 1
        else:
            longest_streak = max(longest_streak, current_streak)
            current_streak = 1

    longest_streak = max(longest_streak, current_streak)

    # --- SUCCESS RATE ---
    first_date = logs[0].log_date
    last_date = logs[-1].log_date
    total_days = (last_date - first_date).days + 1
    success_rate = (len(logs) / total_days) * 100

    # --- BEST DAYS ---
    from collections import Counter
    weekday_counts = Counter(log.log_date.strftime("%A") for log in logs)
    max_count = max(weekday_counts.values())
    best_days = [day for day, count in weekday_counts.items() if count == max_count]

    return {
        "current_streak": current_streak,
        "longest_streak": longest_streak,
        "success_rate": round(success_rate, 2),
        "best_days": best_days
    }