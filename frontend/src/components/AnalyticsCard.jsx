import React from "react";

function AnalyticsCard({ analytics }) {
  if (!analytics) return null;

  return (
    <div style={{ marginTop: "16px" }}>
      <h4>Analytics</h4>
      <p>Current streak: {analytics.current_streak} days</p>
      <p>Longest streak: {analytics.longest_streak} days</p>
      <p>Success rate: {analytics.success_rate}%</p>
      <p>Best days: {analytics.best_days.join(", ") || "N/A"}</p>
    </div>
  );
}

export default AnalyticsCard;
