import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { CreateQuestionRequest } from "../../types";
import { QuestionForm } from "../../shared/component/QuestionFrom";


export const Question = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const handleAddQuestion = async ({
    questionText,
    options,
    correctIndex,
  }: {
    questionText: string;
    options: string[];
    correctIndex: number;
  }) => {
    if (!testId) return;

    const numericTestId = Number(testId);

    if (isNaN(numericTestId)) {
      alert("Invalid Test ID");
      return;
    }

    const payload: CreateQuestionRequest = {
      questionText,
      options: [
        {
          optionText: options[0],
          isCorrect: correctIndex === 0,
        },
        {
          optionText: options[1],
          isCorrect: correctIndex === 1,
        },
      ],
      testId: numericTestId,
    };

    try {
      await api.createQuestion(payload);
      alert("Question added successfully");
    } catch {
      alert("Failed to add question");
    }
  };

  const handlePublish = async () => {
    if (!testId) return;

    const numericTestId = Number(testId);

    if (isNaN(numericTestId)) {
      alert("Invalid Test ID");
      return;
    }

    try {
      await api.publishTest(numericTestId);
      alert("Test Published Successfully");
      navigate("/admin/tests");
    } catch {
      alert("Failed to publish test");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded max-w-md mx-auto mt-10">
      <h2 className="font-bold mb-3 text-lg">Add Question</h2>

      <QuestionForm onSubmit={handleAddQuestion} />

      <div className="flex gap-2 mt-4">
        <button
          onClick={handlePublish}
          className="bg-yellow-500 text-white p-2 w-full rounded"
        >
          Publish Test
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