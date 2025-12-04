const LogForm = ({ habitId, onSubmit }) => {
    const [note, setNote] = useState("");
  
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            habit_id: habitId,
            log_date: new Date().toISOString().split("T")[0],
            note
          });
        }}
      >
        <input
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Add Log</button>
      </form>
    );
  };
  
  export default LogForm;
  