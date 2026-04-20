export default function TaskCard({ task, refresh }) {
  const updateStatus = async (status) => {
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status })
    });

    refresh(); // reload tasks
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-xl transition">
      <h2 className="text-lg font-bold text-indigo-600">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>

      <div className="mt-3 flex justify-between items-center">
        <span
          className={`text-sm px-2 py-1 rounded ${
            task.status === "done"
              ? "bg-green-200"
              : task.status === "in-progress"
              ? "bg-yellow-200"
              : "bg-gray-200"
          }`}
        >
          {task.status}
        </span>

        <select
          className="border p-1 rounded"
          onChange={(e) => updateStatus(e.target.value)}
          value={task.status}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}