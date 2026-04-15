import { Link } from "react-router-dom";

export const DashboardLayout = ({ children }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  return (
    <div className="flex h-screen">

      <div className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Exam System</h2>

        <ul className="space-y-3">
          <li>
            <Link to="/home">Dashboard</Link>
          </li>

          <li>
            <Link to="/tests">Tests</Link>
          </li>

          {isAdmin && (
            <li>
              <Link to="/create">Create Test</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  );
};