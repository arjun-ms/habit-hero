import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHabits } from "../api/habits";
import { getLogsForHabit, createLog, deleteLog } from "../api/logs";
import { getHabitAnalytics } from "../api/analytics";
import Calendar from "../components/Calendar";

function HabitDetails() {
  const { id } = useParams();
  const habitId = Number(id);

  const [habit, setHabit] = useState(null);
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [note, setNote] = useState("");

  const loadHabitMeta = async () => {
    const all = await getHabits();
    const h = all.find((item) => item.id === habitId);
    setHabit(h || null);
  };

  const loadLogsAndAnalytics = async () => {
    const [logsData, analyticsData] = await Promise.all([
      getLogsForHabit(habitId),
      getHabitAnalytics(habitId),
    ]);

    // Sort newest → oldest by id
    const sorted = [...logsData].sort((a, b) => b.id - a.id);

    setLogs(sorted);
    setAnalytics(analyticsData);
  };

  useEffect(() => {
    loadHabitMeta();
    loadLogsAndAnalytics();
  }, [habitId]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    await createLog({
      habit_id: habitId,
      log_date: today,
      note,
    });

    setNote("");
    loadLogsAndAnalytics(); // refresh
  };

  if (!habit) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-gray-700">
        Loading habit...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Back link */}
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        ← Back
      </Link>

      {/* Habit header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{habit.name}</h1>
        <p className="text-gray-600">{habit.frequency}</p>
        <p className="text-gray-500">{habit.category}</p>
      </div>
      <Link
        to={`/habit/${habitId}/edit`}
        className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Edit Habit
      </Link>

      {/* Add check-in card */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-3">Add check-in</h2>
        <form onSubmit={handleAddLog} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Note (optional)"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>

      {/* Check-ins card */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-3">Check-ins</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">No check-ins yet.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-3 border rounded-lg bg-gray-50 text-gray-800 flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{log.log_date}</span>
                  {log.note && <span> — {log.note}</span>}
                </div>

                <button
                  onClick={async () => {
                    await deleteLog(log.id);
                    loadLogsAndAnalytics();
                  }}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Analytics card */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-3">Analytics</h2>
        {analytics ? (
          <div className="space-y-1 text-gray-800">
            <p>
              <span className="font-semibold">Current streak:</span>{" "}
              {analytics.current_streak} days
            </p>
            <p>
              <span className="font-semibold">Longest streak:</span>{" "}
              {analytics.longest_streak} days
            </p>
            <p>
              <span className="font-semibold">Success rate:</span>{" "}
              {analytics.success_rate}%
            </p>
            <p>
              <span className="font-semibold">Best days:</span>{" "}
              {analytics.best_days?.length
                ? analytics.best_days.join(", ")
                : "N/A"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No analytics yet.</p>
        )}
      </div>

      {/* Calendar card */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <Calendar logs={logs} />
      </div>
    </div>
  );
}

export default HabitDetails;
