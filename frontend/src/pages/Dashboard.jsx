import React, { useEffect, useState } from "react";
import { getHabits } from "../api/habits";
import HabitCard from "../components/HabitCard.jsx";

function Dashboard() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    getHabits().then((data) => {
      console.log("Loaded habits:", data);
      setHabits(data);
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {habits.length === 0 && <p>No habits yet</p>}
      {habits.map((h) => (
        <HabitCard key={h.id} habit={h} onOpen={() => {}} />
      ))}
    </div>
  );
}

export default Dashboard;
