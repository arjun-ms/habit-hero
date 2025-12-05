# backend/models.py

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date, datetime


class Habit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    frequency: str            # "daily" or "weekly"
    category: Optional[str] = None
    start_date: date = Field(default_factory=date.today)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    xp: int = Field(default=0)              # for gamification
    
class HabitLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    habit_id: int = Field(foreign_key="habit.id")
    log_date: date = Field(default_factory=date.today)
    note: Optional[str] = None
