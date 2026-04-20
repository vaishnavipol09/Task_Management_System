import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const name = localStorage.getItem("name");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Dynamic Name */}
        <h1 className="text-2xl font-bold">
          Hi, {name ? `${name}'s Dashboard` : "User Dashboard"}
        </h1>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} refresh={fetchTasks} />
          ))}
        </div>
      </div>
    </>
  );
}
