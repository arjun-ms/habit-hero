import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import CreateHabit from "./pages/CreateHabit.jsx";
import HabitDetails from "./pages/HabitDetails.jsx";
import EditHabit from "./pages/EditHabit.jsx";

import SuggestFromExisting from "./pages/SuggestFromExisting.jsx";
import SuggestFromGoals from "./pages/SuggestFromGoals.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateHabit />} />
        <Route path="/habit/:id" element={<HabitDetails />} />
        <Route path="/habit/:id/edit" element={<EditHabit />} />

        {/* 🔥 NEW SUGGESTIONS ROUTES */}
        <Route path="/suggest/existing" element={<SuggestFromExisting />} />
        <Route path="/suggest/goals" element={<SuggestFromGoals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
