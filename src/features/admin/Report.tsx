import { useEffect, useState } from "react";

interface ReportItem {
  testId: number;
  testName: string;
  totalUsers: number;
  averageScore: number;
}

export const Report = () => {
  const [data, setData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/attempts/report");
        const result = await res.json();
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  const totalTests = data.length;
  const totalUsers = data.reduce((sum, r) => sum + r.totalUsers, 0);
  const avgScore =
    data.length > 0
      ? Math.round(
          data.reduce((sum, r) => sum + r.averageScore, 0) / data.length
        )
      : 0;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Admin Report</h1>
        <p className="text-gray-500 mt-1">
          Overview of tests and user performance
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-gray-500 text-sm">Total Tests</h3>
          <p className="text-2xl font-bold mt-1">{totalTests}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-gray-500 text-sm">Total Users Appeared</h3>
          <p className="text-2xl font-bold mt-1">{totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-gray-500 text-sm">Average Score</h3>
          <p className="text-2xl font-bold mt-1">{avgScore}</p>
        </div>

      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Test Reports</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Test</th>
              <th className="p-2 border">Users Appeared</th>
              <th className="p-2 border">Average Score</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.testId}>
                <td className="p-2 border">{item.testName}</td>
                <td className="p-2 border text-center">{item.totalUsers}</td>
                <td
                  className={`p-2 border text-center ${
                    item.averageScore >= 50
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.averageScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};