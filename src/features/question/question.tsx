import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { CreateQuestionRequest } from "../../types";

export const Question = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleCreate = async () => {
    if (!testId) return;

    const numericTestId = Number(testId);

    if (isNaN(numericTestId)) {
      alert("Invalid Test ID");
      return;
    }

    const trimmedQuestion = questionText.trim();

    if (!trimmedQuestion) {
      alert("Question cannot be empty");
      return;
    }

    const trimmedOptions = options.map((o) => o.trim());

    if (trimmedOptions.some((o) => !o)) {
      alert("Options cannot be empty");
      return;
    }

    if (trimmedOptions[0] === trimmedOptions[1]) {
      alert("Options must be different");
      return;
    }

    if (correctIndex === null) {
      alert("Select correct answer");
      return;
    }

    const payload: CreateQuestionRequest = {
      questionText: trimmedQuestion,
      options: [
        {
          optionText: trimmedOptions[0],
          isCorrect: correctIndex === 0,
        },
        {
          optionText: trimmedOptions[1],
          isCorrect: correctIndex === 1,
        },
      ],
      testId: numericTestId,
    };

    try {
      await api.createQuestion(payload);
      setQuestionText("");
      setOptions(["", ""]);
      setCorrectIndex(null);
      alert("Question added successfully");
    } catch {
      alert("Failed to add question");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded max-w-md">
      <h2 className="font-bold mb-3">Add Question</h2>

      <label className="block mb-1 font-medium">Question</label>
      <input
        placeholder="Enter question"
        className="border p-2 w-full mb-3"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2 mb-3">
          <input
            type="radio"
            name="correct"
            checked={correctIndex === i}
            onChange={() => setCorrectIndex(i)}
          />

          <input
            placeholder={`Option ${i + 1}`}
            className="border p-2 w-full"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[i] = e.target.value;
              setOptions(newOptions);
            }}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white p-2 w-full rounded"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/admin/tests")}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Done
        </button>
      </div>
    </div>
  );
};