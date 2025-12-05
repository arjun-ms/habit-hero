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

def update_habit(session: Session, habit_id: int, data: dict):
    habit = session.get(Habit, habit_id)
    if not habit:
        return None

    for key, value in data.items():
        setattr(habit, key, value)

    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit

# -----------------------------------
# HABIT LOG CRUD
# -----------------------------------

def create_log(session: Session, log: HabitLog) -> HabitLog:
    session.add(log)

    # Add XP +10 on each check-in
    habit = session.get(Habit, log.habit_id)
    habit.xp += 10

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


def get_logs_for_habit_limited(session: Session, habit_id: int, limit: int = 20):
    return (
        session.query(HabitLog)
        .filter(HabitLog.habit_id == habit_id)
        .order_by(HabitLog.log_date.desc())
        .limit(limit)
        .all()
    )



# ---------------------------
# Analytics
# ---------------------------
from datetime import date

def get_analytics(habit_id: int, session):
    logs = (
        session.exec(
            select(HabitLog)
            .where(HabitLog.habit_id == habit_id)
            .order_by(HabitLog.log_date)
        ).all()
    )

    if not logs:
        return {
            "current_streak": 0,
            "longest_streak": 0,
            "success_rate": 0,
            "best_days": []
        }

    # Longest streak
    longest = 1
    streak = 1

    for i in range(1, len(logs)):
        prev = logs[i-1].log_date
        curr = logs[i].log_date

        if (curr - prev).days == 1:
            streak += 1
        else:
            streak = 1

        longest = max(longest, streak)

    # Calculate current streak - count backwards from most recent log
    today = date.today()
    days_since_last = (today - logs[-1].log_date).days
    
    if days_since_last == 0:
        # If last log is today, calculate streak backwards from the end
        current = 1
        for i in range(len(logs) - 1, 0, -1):
            prev = logs[i-1].log_date
            curr = logs[i].log_date
            if (curr - prev).days == 1:
                current += 1
            else:
                break
    elif days_since_last == 1:
        # If last log was yesterday, streak is broken
        current = 0
    else:
        # If last log was more than 1 day ago, streak is broken
        current = 0

    # Success rate = #logs / #days since habit start
    habit = session.get(Habit, habit_id)
    total_days = (today - habit.start_date).days + 1
    success_rate = round((len(logs) / total_days) * 100, 2)

    # Best days (weekday frequency)
    weekday_counts = {}
    for log in logs:
        wd = log.log_date.strftime("%A")
        weekday_counts[wd] = weekday_counts.get(wd, 0) + 1

    max_count = max(weekday_counts.values())
    best_days = [day for day, count in weekday_counts.items() if count == max_count]

    return {
        "current_streak": current,
        "longest_streak": longest,
        "success_rate": success_rate,
        "best_days": best_days
    }


# BADGES

# def get_badges(habit, logs, analytics):
#     badges = []

#     if analytics.current_streak >= 7:
#         badges.append("🔥 7-Day Streak")

#     if len(logs) >= 30:
#         badges.append("🏅 30 Logs")

#     if habit.xp >= 100:
#         badges.append("⭐ 100 XP")

#     return badges

def calculate_streak(habit_id: int, session: Session) -> int:
    logs = session.exec(
        select(HabitLog).where(HabitLog.habit_id == habit_id).order_by(HabitLog.log_date)
    ).all()

    if not logs:
        return 0

    streak = 1
    longest = 1

    for i in range(1, len(logs)):
        prev = logs[i-1].log_date
        curr = logs[i].log_date

        if (curr - prev).days == 1:
            streak += 1
        else:
            streak = 1

        longest = max(longest, streak)

    # If last log is not today, current streak resets
    from datetime import date
    if (date.today() - logs[-1].log_date).days != 0:
        return 0

    return streak

def get_badges(habit, logs, analytics):
    badges = []

    if len(logs) >= 30:
        badges.append("Logged 30 times")

    # Award 7-day streak badge if current streak OR longest streak >= 7
    current_streak = analytics.get("current_streak", 0)
    longest_streak = analytics.get("longest_streak", 0)
    if current_streak >= 7 or longest_streak >= 7:
        badges.append("7-Day Streak")

    if habit.xp >= 100:
        badges.append("100 XP")

    return badges

