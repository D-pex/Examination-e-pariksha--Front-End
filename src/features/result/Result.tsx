import { useLocation, useNavigate } from "react-router-dom";

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  if (!result) {
    return (
      <div className="p-6 text-center">
        <p>No result found</p>
        <button
          onClick={() => navigate("/home")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1
          className={`text-3xl font-bold ${
            result.ispassed ? "text-green-500" : "text-red-500"
          }`}
        >
          {result.ispassed ? "Passed 🎉" : "Failed ❌"}
        </h1>

        <p className="text-xl mt-4">Score: {result.totalScore}</p>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};