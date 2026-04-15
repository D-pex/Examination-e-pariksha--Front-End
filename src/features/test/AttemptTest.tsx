/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export const AttemptTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [test, setTest] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [started, setStarted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load test
  useEffect(() => {
    if (!id) return;

    api.getTestById(id)
      .then((data) => {
        setTest(data);
        setTimeLeft((data?.durationMinutes || 60) * 60);
      })
      .catch(() => setError("Failed to load test"))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Timer
  useEffect(() => {
    if (started && timeLeft > 0 && !result) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && started) {
      // eslint-disable-next-line react-hooks/immutability
      handleSubmit();
    }
  }, [timeLeft, started, result]);

  const handleStart = () => setStarted(true);

  const handleNext = () => {
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      const res = await api.submitAttempt(test.id, user.id || "temp", answers);
      setResult(res);
    } catch {
      alert("Submit failed");
    }
  };

  // 🔹 States
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!test) return <div className="p-6">No test found</div>;

  // 🔹 Result screen
  if (result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1
          className={`text-3xl font-bold ${
            result.ispassed ? "text-green-500" : "text-red-500"
          }`}
        >
          {result.ispassed ? "Passed 🎉" : "Failed ❌"}
        </h1>

        <p className="text-xl mt-2">Score: {result.totalScore}</p>

        <button
          onClick={() => navigate("/home")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // 🔹 Start screen
  if (!started) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold">{test.name}</h1>

        <p className="mt-2 text-gray-600">{test.description}</p>

        <div className="mt-4 space-y-2">
          <p><b>Subject:</b> {test.subject}</p>
          <p><b>Duration:</b> {test.durationMinutes} min</p>
          <p><b>Questions:</b> {test.questions?.length || 0}</p>
        </div>

        <button
          onClick={handleStart}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded"
        >
          Start Test
        </button>
      </div>
    );
  }

  const q = test.questions[currentIndex];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = ("0" + (timeLeft % 60)).slice(-2);

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">
          Question {currentIndex + 1}/{test.questions.length}
        </h2>

        <span className={timeLeft < 60 ? "text-red-500" : ""}>
          {minutes}:{seconds}
        </span>
      </div>

      {/* Question */}
      <div className="bg-white p-4 shadow rounded">
        <p className="mb-4 font-medium">{q.text}</p>

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
        {q.options.map((opt: any) => (
          <label key={opt.id} className="block mb-2">
            <input
              type="radio"
              name={q.id}
              value={opt.id}
              checked={answers[q.id] === opt.id}
              onChange={() =>
                setAnswers({ ...answers, [q.id]: opt.id })
              }
              className="mr-2"
            />
            {opt.text}
          </label>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        {currentIndex === test.questions.length - 1
          ? "Submit Test"
          : "Next"}
      </button>
    </div>
  );
};