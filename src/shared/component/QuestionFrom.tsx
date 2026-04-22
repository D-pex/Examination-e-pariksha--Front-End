import { useState } from "react";

type Props = {
  onSubmit: (data: {
    questionText: string;
    options: string[];
    correctIndex: number;
  }) => Promise<void> | void;
};

export const QuestionForm = ({ onSubmit }: Props) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedQuestion = questionText.trim();
    const trimmedOptions = options.map((o) => o.trim());

    if (!trimmedQuestion) {
      alert("Question cannot be empty");
      return;
    }

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

    try {
      setLoading(true);

      await onSubmit({
        questionText: trimmedQuestion,
        options: trimmedOptions,
        correctIndex,
      });

      setQuestionText("");
      setOptions(["", ""]);
      setCorrectIndex(null);
    } catch {
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter question"
        className="border p-2 w-full mb-3 rounded"
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
            className="border p-2 w-full rounded"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[i] = e.target.value;
              setOptions(newOptions);
            }}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-500 text-white p-2 w-full rounded disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Question"}
      </button>
    </div>
  );
};