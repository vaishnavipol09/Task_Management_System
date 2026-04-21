import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("User fetch error:", error.message);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  // Create task
  const createTask = async () => {
    if (!form.title || !form.description || !form.assignedTo) {
      alert("Please fill all fields"); 
      return;
    }

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", assignedTo: "" });
    fetchTasks();
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          Admin Dashboard
        </h1>

        {/* Create Task Form */}
        <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-4">
          <input
            placeholder="Title"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            onClick={createTask}
            disabled={!form.title || !form.description || !form.assignedTo}
            className="bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Create Task
          </button>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow border">
              <h2 className="font-bold text-lg">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>

              <p className="text-sm mt-2">
                👤 {task.assignedTo?.name || "Not Assigned"}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === "done"
                    ? "bg-green-200"
                    : task.status === "in-progress"
                      ? "bg-yellow-200"
                      : "bg-gray-200"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
