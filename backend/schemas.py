"""
These Pydantic/SQLModel models define what your API expects and returns.
"""
# backend/schemas.py

from typing import Optional, List
from datetime import date, datetime
from sqlmodel import SQLModel


# -------------------------
# Habit Schemas
# -------------------------

class HabitBase(SQLModel):
    name: str
    frequency: str                  # "daily", "weekly"
    category: Optional[str] = None


class HabitCreate(HabitBase):
    pass


class HabitRead(HabitBase):
    id: int
    start_date: date
    created_at: datetime


# -------------------------
# HabitLog Schemas
# -------------------------

class HabitLogBase(SQLModel):
    note: Optional[str] = None


class HabitLogCreate(HabitLogBase):
    habit_id: int
    log_date: date


class HabitLogRead(HabitLogBase):
    id: int
    habit_id: int
    log_date: date
