import React from "react";
import dayjs from "dayjs";

function Calendar({ logs }) {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");

  const startDay = startOfMonth.day(); // 0 = Sunday
  const daysInMonth = today.daysInMonth();

  // Convert logs list to a fast lookup (Set)
  const checkInDates = new Set(logs.map((l) => l.log_date));

  // Build calendar days array
  const days = [];

  // Push empty cells before the 1st of the month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Push actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Calendar</h3>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="p-3"></div>;
          }

          const dateString = today.format("YYYY-MM") + "-" + String(day).padStart(2, "0");
          const isChecked = checkInDates.has(dateString);
          const isToday = day === today.date();

          return (
            <div
              key={idx}
              className={`
                p-3 rounded-lg border
                ${isToday ? "bg-blue-100 border-blue-500 font-bold" : ""}
                ${isChecked ? "bg-green-200 border-green-600" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
