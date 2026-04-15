import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.login({ email, password });

      if (email === "admin@email.com") {
        res.role = "admin";
      } else {
        res.role = "user";
      }

      localStorage.setItem("user", JSON.stringify(res));
      navigate("/home");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">E-परीक्षा Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Secure Login System</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full border border-blue-600 text-blue-600 py-2.5 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};