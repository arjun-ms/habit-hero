const HabitDetails = () => {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    const [analytics, setAnalytics] = useState(null);
  
    useEffect(() => {
      getLogs(id).then(setLogs);
      getHabitAnalytics(id).then(setAnalytics);
    }, [id]);
  
    const addLog = async (data) => {
      await createLog(data);
      getLogs(id).then(setLogs);
      getHabitAnalytics(id).then(setAnalytics);
    };
  
    return (
      <div>
        <h2>Habit Details</h2>
  
        <LogForm habitId={id} onSubmit={addLog} />
  
        <LogList logs={logs} />
  
        <AnalyticsCard analytics={analytics} />
      </div>
    );
  };
  
  export default HabitDetails;
  