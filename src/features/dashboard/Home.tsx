import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

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
  const [avgScore, setAvgScore] = useState<number>(0);

  useEffect(() => {
    if (user.role === "admin") {
      navigate("/admin");
      return;
    }

    const loadData = async () => {
      try {
        const tests = await api.getPublishedTests();
        setTestCount(tests.length);

        if (user.id) {
          const userAttempts = await api.getAttemptsByUserId(user.id);

          if (userAttempts.length > 0) {
            const total = userAttempts.reduce(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (sum: number, a: any) => sum + a.totalScore,
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
  }, [navigate, user.role, user.id]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name || "User"} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Manage tests and track your performance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={() => navigate("/tests")}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <h3 className="text-gray-500 text-sm">Total Tests</h3>
          <p className="text-2xl font-bold mt-1">{testCount}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-gray-500 text-sm">Average Score</h3>
          <p className="text-2xl font-bold mt-1">{avgScore}</p>
        </div>
      </div>
    </div>
  );
};