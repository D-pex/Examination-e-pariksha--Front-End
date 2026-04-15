import { useState } from "react";
import { api } from "../../services/api";

export const CreateTest = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<any>({});

  const handleCreate = async () => {
    await api.createTest(form);
    alert("Test Created");
  };

  return (
    <div className="bg-white p-4 shadow rounded max-w-md">
      <h2 className="text-lg font-bold mb-3">Create Test</h2>

      <input placeholder="Name" className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Subject" className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, subject: e.target.value })} />

      <textarea placeholder="Description" className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <button onClick={handleCreate} className="bg-green-500 text-white p-2 w-full">
        Create
      </button>
    </div>
  );
};