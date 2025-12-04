import React, { useState } from "react";

function HabitForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    frequency: "daily",
    category: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div>
        <label className="font-medium">Habit name</label>
        <input
          name="name"
          className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={form.name}
          onChange={update}
          placeholder="Run 1 km a day"
        />
      </div>

      <div>
        <label className="font-medium">Frequency</label>
        <select
          name="frequency"
          className="w-full mt-1 p-2 border rounded-lg"
          value={form.frequency}
          onChange={update}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label className="font-medium">Category</label>
        <input
          name="category"
          className="w-full mt-1 p-2 border rounded-lg"
          value={form.category}
          onChange={update}
          placeholder="health / work / learning"
        />
      </div>

      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Save Habit
      </button>
    </form>
  );
}

export default HabitForm;
