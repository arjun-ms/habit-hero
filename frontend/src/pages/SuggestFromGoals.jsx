import React, { useState } from "react";
import { generateSuggestionFromGoals } from "../api/suggestions";

function SuggestFromGoals() {
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const handleGenerate = async () => {
    if (!goals.trim()) return;
    setLoading(true);
    const text = await generateSuggestionFromGoals(goals);
    setSuggestions(text);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Suggest Habits</h1>
      <p className="text-gray-600">Based on your personal goals</p>

      <textarea
        className="w-full h-32 border p-3 rounded-lg"
        placeholder="Describe your goals... (e.g., lose weight, be more productive)"
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Suggest Habits"}
      </button>

      {suggestions && (
        <div className="bg-white p-5 rounded-xl shadow border whitespace-pre-line text-gray-800">
          {suggestions}
        </div>
      )}
    </div>
  );
}

export default SuggestFromGoals;
