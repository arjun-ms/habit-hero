import React from "react";

const AnalyticsCard = ({ analytics }) => {
  if (!analytics) return null;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Analytics</h3>

      <div style={styles.row}>
        <span>Current Streak:</span>
        <strong>{analytics.current_streak} days</strong>
      </div>

      <div style={styles.row}>
        <span>Longest Streak:</span>
        <strong>{analytics.longest_streak} days</strong>
      </div>

      <div style={styles.row}>
        <span>Success Rate:</span>
        <strong>{analytics.success_rate}%</strong>
      </div>

      <div style={styles.row}>
        <span>Best Days:</span>
        <strong>{analytics.best_days.join(", ")}</strong>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "16px",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  title: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
};

export default AnalyticsCard;
