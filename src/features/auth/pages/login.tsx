import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await api.login({ email, password });
    localStorage.setItem("user", JSON.stringify(res));
    navigate("/home");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        placeholder="Email"
        className="w-full border p-2 mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
};