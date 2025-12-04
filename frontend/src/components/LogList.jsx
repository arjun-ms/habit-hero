const LogList = ({ logs }) => {
    return (
      <div>
        <h4>Logs</h4>
        {logs.map(log => (
          <div key={log.id}>
            <p>{log.log_date}</p>
            <p>{log.note}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default LogList;
  