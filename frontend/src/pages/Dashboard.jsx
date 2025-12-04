import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getHabits, deleteHabit } from "../api/habits";
import HabitCard from "../components/HabitCard";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  const loadHabits = () => {
    getHabits().then((data) => {
      setHabits(data);

      // Extract unique non-null categories
      const uniqueCats = [
        ...new Set(
          data.map((h) => h.category).filter((c) => c && c.trim() !== "")
        ),
      ];

      setCategories(uniqueCats);
    });
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-3">
          <label className="text-gray-600">Category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Link
          to="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + New Habit
        </Link>
      </div>

      {habits.length === 0 ? (
        <p className="text-gray-600">No habits yet. Create one!</p>
      ) : (
        <div className="grid gap-4">
          {habits
            .filter((h) => filter === "all" || h.category === filter)
            .map((h) => (
              <HabitCard
                key={h.id}
                habit={h}
                onOpen={(id) => navigate(`/habit/${id}`)}
                onDelete={async (id) => {
                  await deleteHabit(id);
                  loadHabits();
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
