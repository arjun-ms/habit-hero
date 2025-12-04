import React from "react";
import { Link } from "react-router-dom";


function HabitCard({ habit, onOpen, onDelete }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-blue-600"
        onClick={() => onOpen(habit.id)}
      >
        {habit.name}
      </h3>

      <p className="text-gray-700">{habit.frequency}</p>
      <p className="text-gray-500 text-sm">{habit.category}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onOpen(habit.id)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View
        </button>

        <Link
          to={`/habit/${habit.id}/edit`}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(habit.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
