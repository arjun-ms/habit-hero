import React, { useState } from "react";

function HabitForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    frequency: "daily",
    category: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Habit name</label>
        <br />
        <input
          name="name"
          value={form.name}
          onChange={update}
          placeholder="Run 1 km a day"
        />
      </div>

      <div>
        <label>Frequency</label>
        <br />
        <select name="frequency" value={form.frequency} onChange={update}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label>Category</label>
        <br />
        <input
          name="category"
          value={form.category}
          onChange={update}
          placeholder="health / work / learning..."
        />
      </div>

      <button type="submit" style={{ marginTop: "8px" }}>
        Save habit
      </button>
    </form>
  );
}

export default HabitForm;
