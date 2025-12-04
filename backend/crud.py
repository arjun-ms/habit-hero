# backend/crud.py

from typing import List
from sqlmodel import Session, select

from models import Habit, HabitLog


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
