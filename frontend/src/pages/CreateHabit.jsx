const CreateHabit = () => {
    const submit = async (form) => {
      await createHabit(form);
      window.location.href = "/";
    };
  
    return (
      <div>
        <h2>Create Habit</h2>
        <HabitForm onSubmit={submit} />
      </div>
    );
  };
  
  export default CreateHabit;
  