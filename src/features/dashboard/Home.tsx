import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

interface Attempt {
  totalScore: number;
}

interface User {
  id?: number;
  name?: string;
  role?: string;
}

export const Home = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user: User = storedUser ? JSON.parse(storedUser) : {};

  const [testCount, setTestCount] = useState<number>(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [avgScore, setAvgScore] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tests = await api.getPublishedTests();
        setTestCount(tests.length);

        if (user.id) {
          const userAttempts = await api.getAttemptsByUserId(user.id);

          setAttempts(userAttempts);

          if (userAttempts.length > 0) {
            const total = userAttempts.reduce(
              (sum: number, a: Attempt) => sum + a.totalScore,
              0
            );

            setAvgScore(Math.round(total / userAttempts.length));
          }
        }
      } catch {
        console.log("Failed to load dashboard data");
      }
    };

    loadData();
  }, [user.id]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-100">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name || "User"} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Manage tests, track performance, and improve results
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div
          onClick={() => navigate("/tests")}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <h3 className="text-gray-500 text-sm">Total Tests</h3>
          <p className="text-2xl font-bold mt-1">{testCount}</p>
        </div>

        <div
          onClick={() => navigate("/my-attempts")}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <h3 className="text-gray-500 text-sm">Attempts</h3>
          <p className="text-2xl font-bold mt-1">{attempts.length}</p>
        </div>

        <div
          onClick={() => navigate("/my-attempts")}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <h3 className="text-gray-500 text-sm">Average Score</h3>
          <p className="text-2xl font-bold mt-1">{avgScore}</p>
        </div>

      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">

          {user.role === "admin" && (
            <>
              <button
                onClick={() => navigate("/create")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Create Test
              </button>

              <button
                onClick={() => navigate("/admin")}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Admin Panel
              </button>
            </>
          )}

          <button
            onClick={() => navigate("/tests")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Tests
          </button>

        </div>
      </div>

    </div>
  );
};