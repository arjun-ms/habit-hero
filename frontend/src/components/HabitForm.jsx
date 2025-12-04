const HabitForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
      name: "",
      frequency: "daily",
      category: ""
    });
  
    const update = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <input name="name" placeholder="Habit name" onChange={update} />
        <select name="frequency" onChange={update}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <input name="category" placeholder="Category" onChange={update} />
        <button type="submit">Create Habit</button>
      </form>
    );
  };
  
  export default HabitForm;
  