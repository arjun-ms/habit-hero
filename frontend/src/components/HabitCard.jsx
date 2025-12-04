function HabitCard({ habit, onOpen, onDelete }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white">
      <h3
        className="text-xl font-semibold cursor-pointer hover:text-blue-600"
        onClick={() => onOpen(habit.id)}
      >
        {habit.name}
      </h3>

      <p className="text-gray-700">{habit.frequency}</p>
      <p className="text-gray-500 text-sm">{habit.category}</p>

      <div className="mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => onOpen(habit.id)}
        >
          View
        </button>

        <button
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => onDelete(habit.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
