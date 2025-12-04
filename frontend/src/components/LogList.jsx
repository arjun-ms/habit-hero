import React from "react";

function LogList({ logs }) {
  if (!logs || logs.length === 0) {
    return <p>No check-ins yet.</p>;
  }

  return (
    <div>
      <h4>Check-ins</h4>
      {logs.map((log) => (
        <div key={log.id} style={{ marginBottom: "8px" }}>
          <strong>{log.log_date}</strong>
          {log.note && <span> — {log.note}</span>}
        </div>
      ))}
    </div>
  );
}

export default LogList;
