import { useState } from "react";
import { api } from "../../services/api";
import type  { CreateTestRequest } from "../../types";
import { useNavigate } from "react-router-dom";

export const CreateTest = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateTestRequest>({
    name: "",
    subject: "",
    description: "",
    durationMinutes: 60,
  });

  const handleCreate = async () => {
    const res = await api.createTest(form);
    alert("Test Created");
    navigate(`/create-question/${res.id}`);
  };

  return (
    <div className="bg-white p-4 shadow rounded max-w-md">
      <h2 className="text-lg font-bold mb-3">Create Test</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Subject"
        className="border p-2 w-full mb-2"
        value={form.subject}
        onChange={(e) =>
          setForm({ ...form, subject: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Duration (minutes)"
        className="border p-2 w-full mb-2"
        value={form.durationMinutes}
        onChange={(e) =>
          setForm({
            ...form,
            durationMinutes: Number(e.target.value),
          })
        }
      />

      <button
        onClick={handleCreate}
        className="bg-green-500 text-white p-2 w-full"
      >
        Create
      </button>
    </div>
  );
};