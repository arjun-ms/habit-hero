import React from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../api/habits";
import HabitForm from "../components/HabitForm";

function CreateHabit() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await createHabit(form);
    navigate("/");
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Create Habit</h2>
      <HabitForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateHabit;
