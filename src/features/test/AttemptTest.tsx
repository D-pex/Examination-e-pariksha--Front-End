import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Test, Question, AttemptResult, Answers } from "../../types";

export const AttemptTest: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const numericTestId = Number(testId);

  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!numericTestId) return;

    const loadData = async () => {
      try {
        const testData = await api.getTestById(numericTestId.toString());
        const questionData = await api.getQuestionsByTestId(numericTestId);

        setTest(testData);
        setQuestions(questionData);
        setTimeLeft((testData.durationMinutes || 60) * 60);
      } catch {
        setError("Failed to load test");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [numericTestId]);

  useEffect(() => {
    if (started && timeLeft > 0 && !result) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && started && !result) {
      handleSubmit();
    }
  }, [timeLeft, started, result]);

  const handleStart = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("User not logged in");
        navigate("/");
        return;
      }

      const user: { id: number } = JSON.parse(storedUser);

      const attempt = await api.startAttempt(user.id, numericTestId);

      setAttemptId(attempt.id);
      setStarted(true);
    } catch {
      alert("Failed to start test");
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!attemptId) return;

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, optionId]) => ({
        questionId: Number(questionId),
        selectedOptionId: optionId,
      })
    );

    try {
      const finalResult = await api.submitAllAnswers({
        attemptId,
        answers: formattedAnswers,
      });

      setResult(finalResult);
    } catch {
      alert("Submit failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!test) return <div className="p-6">No test found</div>;

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

  if (!started) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold">{test.name}</h1>

        <p className="mt-2 text-gray-600">{test.description}</p>

        <div className="mt-4 space-y-2">
          <p><b>Subject:</b> {test.subject}</p>
          <p><b>Duration:</b> {test.durationMinutes} min</p>
          <p><b>Questions:</b> {questions.length}</p>
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

  const q = questions[currentIndex];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = ("0" + (timeLeft % 60)).slice(-2);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">
          Question {currentIndex + 1}/{questions.length}
        </h2>

        <span className={timeLeft < 60 ? "text-red-500" : ""}>
          {minutes}:{seconds}
        </span>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p className="mb-4 font-medium">{q.questionText}</p>

        {q.options.map((opt) => (
          <label key={opt.id} className="block mb-2">
            <input
              type="radio"
              name={q.id.toString()}
              value={opt.id}
              checked={answers[q.id] === opt.id}
              onChange={() =>
                setAnswers({ ...answers, [q.id]: opt.id })
              }
              className="mr-2"
            />
            {opt.optionText}
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        {currentIndex === questions.length - 1
          ? "Submit Test"
          : "Next"}
      </button>
    </div>
  );
};