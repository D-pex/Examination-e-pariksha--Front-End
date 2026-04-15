import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const TestList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tests, setTests] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getTests().then(setTests);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tests</h1>

      <div className="grid grid-cols-3 gap-4">
        {tests.map((t) => (
          <div key={t.id} className="bg-white p-4 shadow rounded">
            <h2>{t.name}</h2>
            <p>{t.subject}</p>

            <button
              onClick={() => navigate(`/attempt/${t.id}`)}
              className="bg-blue-500 text-white px-2 py-1 mt-2"
            >
              Attempt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};