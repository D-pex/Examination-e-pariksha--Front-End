import { useState } from "react";
import { api } from "../../services/api";
import type { CreateQuestionRequest } from "../../types";


interface FormState {
  text: string;
  options: string[];
  correctAnswer: string;
  testId: string;
}

export const CreateQuestion = () => {
  const [form, setForm] = useState<FormState>({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    testId: ""
  });

  const handleCreate = async () => {
    const payload: CreateQuestionRequest = {
      text: form.text,
      options: form.options.map((opt) => ({ text: opt })),
      correctAnswer: form.correctAnswer,
      testId: form.testId
    };

    await api.createQuestion(payload);
    alert("Question added");
  };

  return (
    <div className="bg-white p-4 shadow rounded max-w-md">
      <h2 className="font-bold mb-3">Add Question</h2>

      <input
        placeholder="Question"
        className="border p-2 w-full mb-2"
        value={form.text}
        onChange={(e) =>
          setForm({ ...form, text: e.target.value })
        }
      />

      {form.options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          className="border p-2 w-full mb-2"
          value={opt}
          onChange={(e) => {
            const newOptions = [...form.options];
            newOptions[i] = e.target.value;
            setForm({ ...form, options: newOptions });
          }}
        />
      ))}

      <input
        placeholder="Correct Answer"
        className="border p-2 w-full mb-2"
        value={form.correctAnswer}
        onChange={(e) =>
          setForm({ ...form, correctAnswer: e.target.value })
        }
      />

      <input
        placeholder="Test ID"
        className="border p-2 w-full mb-2"
        value={form.testId}
        onChange={(e) =>
          setForm({ ...form, testId: e.target.value })
        }
      />

      <button
        onClick={handleCreate}
        className="bg-green-500 text-white p-2 w-full"
      >
        Add Question
      </button>
    </div>
  );
};