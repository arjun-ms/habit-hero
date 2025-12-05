
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

def create_habit_report(habit, logs, analytics, filepath):
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter

    y = height - 50

    # Title
    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, y, f"Habit Report: {habit.name}")
    y -= 30

    # Habit details
    c.setFont("Helvetica", 12)
    c.drawString(50, y, f"Category: {habit.category}")
    y -= 20
    c.drawString(50, y, f"Frequency: {habit.frequency}")
    y -= 20
    c.drawString(50, y, f"Start Date: {habit.start_date}")
    y -= 30

    # Analytics
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Analytics")
    y -= 25

    c.setFont("Helvetica", 12)
    c.drawString(50, y, f"Current streak: {analytics['current_streak']}")
    y -= 20
    c.drawString(50, y, f"Longest streak: {analytics['longest_streak']}")
    y -= 20
    c.drawString(50, y, f"Success rate: {analytics['success_rate']}%")
    y -= 30

    # Logs
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Check-ins")
    y -= 25

    c.setFont("Helvetica", 12)
    for log in logs:
        line = f"{log.log_date} – {log.note or ''}"
        c.drawString(50, y, line)
        y -= 18

        if y < 60:
            c.showPage()
            y = height - 50

    c.save()
