import React, { useState } from "react";

function LogForm({ habitId, onSubmit }) {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    onSubmit({
      habit_id: Number(habitId),
      log_date: today,
      note,
    });

    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add check-in</h4>
      <input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit" style={{ marginLeft: "8px" }}>
        Add
      </button>
    </form>
  );
}

export default LogForm;
