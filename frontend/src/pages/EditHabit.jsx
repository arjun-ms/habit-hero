import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getHabits, updateHabit } from "../api/habits";

function EditHabit() {
  const { id } = useParams();
  const habitId = Number(id);

  const [habit, setHabit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getHabits().then((list) => {
      const h = list.find((x) => x.id === habitId);
      setHabit(h);
    });
  }, [habitId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHabit(habitId, habit);
    navigate(`/habit/${habitId}`);
  };

  if (!habit) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Link to="/" className="text-blue-600">← Back</Link>

      <h1 className="text-2xl font-bold">Edit Habit</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border rounded"
          value={habit.name}
          onChange={(e) => setHabit({ ...habit, name: e.target.value })}
        />

        <select
          className="w-full p-2 border rounded"
          value={habit.frequency}
          onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <input
          className="w-full p-2 border rounded"
          value={habit.category}
          onChange={(e) => setHabit({ ...habit, category: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={habit.start_date}
          onChange={(e) => setHabit({ ...habit, start_date: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditHabit;
