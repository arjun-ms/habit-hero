import React, { useState } from "react";

function Calendar({ logs }) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const logDates = new Set(logs.map((l) => l.log_date));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startOffset = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

  const days = [];

  // Empty cells before month start
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  // Navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const format = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-12"></div>;
          }

          const dateStr = format(day);

          const isToday =
            dateStr ===
            format(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

          const hasLog = logDates.has(dateStr);

          return (
            <div
              key={index}
              className={`h-12 flex items-center justify-center rounded border
                ${isToday ? "bg-yellow-100 border-yellow-400" : ""}
                ${hasLog ? "bg-blue-200 border-blue-500 font-semibold" : ""}
                ${!isToday && !hasLog ? "bg-gray-100" : ""}
                cursor-pointer hover:bg-gray-300`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
