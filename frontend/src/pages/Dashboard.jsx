import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getHabits, deleteHabit } from "../api/habits";
import HabitCard from "../components/HabitCard";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const loadHabits = () => {
    getHabits().then((data) => {
      console.log("Loaded habits:", data);
      setHabits(data);
    });
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleOpen = (id) => navigate(`/habit/${id}`);
  const handleDelete = async (id) => {
    await deleteHabit(id);
    loadHabits();
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Dashboard</h2>
      <p>
        <Link to="/create">+ Create a new habit</Link>
      </p>
      {habits.length === 0 && <p>No habits yet. Create one!</p>}
      {habits.map((h) => (
        <HabitCard
          key={h.id}
          habit={h}
          onOpen={handleOpen}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Dashboard;
