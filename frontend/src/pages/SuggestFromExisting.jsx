import React, { useState, useEffect } from "react";
import { getHabits } from "../api/habits";
import { generateSuggestionFromExisting } from "../api/suggestions";

function SuggestFromExisting() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    getHabits().then(setHabits);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await generateSuggestionFromExisting(habits);
    setSuggestions(text);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Suggest Habits</h1>
      <p className="text-gray-600">Based on your existing habits</p>

      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-3">Your current habits:</h2>

        {habits.length === 0 ? (
          <p className="text-gray-500">No habits yet.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700">
            {habits.map((h) => (
              <li key={h.id}>{h.name} ({h.category})</li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Suggest New Habits"}
      </button>

      {suggestions && (
        <div className="bg-white p-5 rounded-xl shadow border whitespace-pre-line text-gray-800">
          {suggestions}
        </div>
      )}
    </div>
  );
}

export default SuggestFromExisting;
