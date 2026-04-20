import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
      navigate("/"); // 👈 back to login
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={(e)=>setForm({...form,role:e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}