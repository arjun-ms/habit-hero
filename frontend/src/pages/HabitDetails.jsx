import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHabits } from "../api/habits";
import { getLogsForHabit, createLog } from "../api/logs";
import { getHabitAnalytics } from "../api/analytics";
import LogForm from "../components/LogForm";
import LogList from "../components/LogList";
import AnalyticsCard from "../components/AnalyticsCard";

function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const loadLogsAndAnalytics = async () => {
    const [logsData, analyticsData] = await Promise.all([
      getLogsForHabit(id),
      getHabitAnalytics(id),
    ]);
    setLogs(logsData);
    setAnalytics(analyticsData);
  };

  const loadHabitMeta = async () => {
    // reuse /habits list and pick the one we need
    const all = await getHabits();
    const current = all.find((h) => h.id === Number(id));
    setHabit(current || null);
  };

  useEffect(() => {
    loadHabitMeta();
    loadLogsAndAnalytics();
  }, [id]);

  const handleAddLog = async (data) => {
    await createLog(data);
    loadLogsAndAnalytics();
  };

  return (
    <div style={{ padding: "16px" }}>
      <p>
        <Link to="/">← Back to dashboard</Link>
      </p>

      <h2>Habit Details</h2>
      {habit ? (
        <div>
          <h3>{habit.name}</h3>
          <p>{habit.frequency}</p>
          <p>{habit.category}</p>
        </div>
      ) : (
        <p>Loading habit...</p>
      )}

      <LogForm habitId={id} onSubmit={handleAddLog} />
      <LogList logs={logs} />
      <AnalyticsCard analytics={analytics} />
    </div>
  );
}

export default HabitDetails;
