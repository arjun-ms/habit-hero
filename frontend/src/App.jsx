import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import CreateHabit from "./pages/CreateHabit.jsx";
import HabitDetails from "./pages/HabitDetails.jsx";

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 TAILWIND TEST */}
      {/* <h1 className="text-5xl font-bold text-red-600">
        TAILWIND TEST
      </h1> */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateHabit />} />
        <Route path="/habit/:id" element={<HabitDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
