import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import type { Test } from "../../types";

export const TestList = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTests = async () => {
      const data = await api.getPublishedTests();
      setTests(data);
    };

    loadTests();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tests</h1>

      <div className="grid grid-cols-3 gap-4">
        {tests.map((t) => (
          <div key={t.id} className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold">{t.name}</h2>
            <p className="text-sm text-gray-500">{t.subject}</p>

            <button
              onClick={() => navigate(`/attempt/${t.id}`)}
              className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
            >
              Attempt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};