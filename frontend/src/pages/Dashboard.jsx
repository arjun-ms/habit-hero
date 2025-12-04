import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getHabits, deleteHabit } from "../api/habits";
import HabitCard from "../components/HabitCard";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [showSuggestOptions, setShowSuggestOptions] = useState(false);

  const navigate = useNavigate();

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
      {/* Header: title + filters + actions */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSuggestOptions(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Suggest Habits
          </button>

          <Link
            to="/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + New Habit
          </Link>
        </div>
      </div>

      {/* Habit list */}
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

      {/* Suggest Habits options modal */}
      {showSuggestOptions && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center space-y-4">
            <h2 className="text-xl font-bold">Suggest Habits</h2>

            <button
              onClick={() => {
                setShowSuggestOptions(false);
                navigate("/suggest/existing");
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Based on existing habits
            </button>

            <button
              onClick={() => {
                setShowSuggestOptions(false);
                navigate("/suggest/goals");
              }}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Based on personal goals
            </button>

            <button
              onClick={() => setShowSuggestOptions(false)}
              className="text-gray-500 text-sm hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
