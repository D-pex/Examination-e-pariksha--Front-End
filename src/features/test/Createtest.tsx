import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { CreateTestRequest } from "../../types";
import { useNavigate } from "react-router-dom";

export const CreateTest = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState<CreateTestRequest>({
    name: "",
    subject: "",
    description: "",
    durationMinutes: 60,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/home");
    }
  }, [navigate, user.role]);

  const handleCreate = async () => {
    try {
      if (!form.name || !form.subject) return;

      setLoading(true);

      const res = await api.createTest(form);

      if (!res?.id) return;

      navigate(`/create-question/${res.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Create Test</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Subject"
          className="border p-2 w-full mb-3 rounded-lg"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded-lg"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          className="border p-2 w-full mb-4 rounded-lg"
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
          disabled={loading}
          className="bg-green-600 text-white p-2.5 w-full rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Test"}
        </button>
      </div>
    </div>
  );
};