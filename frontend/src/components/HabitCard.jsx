import React from "react";

function HabitCard({ habit, onOpen, onDelete }) {
  return (
    <div style={{ marginBottom: "12px", cursor: "pointer" }}>
      <h3 onClick={() => onOpen(habit.id)}>{habit.name}</h3>
      <p>{habit.frequency}</p>
      <p>{habit.category}</p>
      <button onClick={() => onOpen(habit.id)}>View</button>
      <button onClick={() => onDelete(habit.id)} style={{ marginLeft: "8px" }}>
        Delete
      </button>
    </div>
  );
}

export default HabitCard;
