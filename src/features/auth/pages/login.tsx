import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (roleType: "user" | "admin") => {
    try {
      setLoading(true);
      setError("");

      if (roleType === "admin" && email !== "admin@email.com") {
        setError("Not authorized as admin");
        setLoading(false);
        return;
      }

      const res = await api.login({ email, password });

      res.role = roleType;

      localStorage.setItem("user", JSON.stringify(res));
      navigate("/home");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">E-परीक्षा Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Secure Login System</p>
        </div>

        <div className="space-y-4">

          {error && (
            <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-300">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => handleLogin("user")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm text-gray-500">
            <span
              onClick={() => handleLogin("admin")}
              className="cursor-pointer hover:text-black underline"
            >
              Admin Login
            </span>
          </div>

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