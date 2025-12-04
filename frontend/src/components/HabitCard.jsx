const HabitCard = ({ habit, onOpen }) => {
    return (
      <div onClick={() => onOpen(habit.id)}>
        <h3>{habit.name}</h3>
        <p>{habit.frequency}</p>
        <p>{habit.category}</p>
      </div>
    );
  };
  
  export default HabitCard;
  