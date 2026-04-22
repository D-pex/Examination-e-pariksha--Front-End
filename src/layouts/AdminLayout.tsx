import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AdminLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <div className="w-60 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/create-test">Create Test</Link>
          </li>

          <li>
            <Link to="/admin/tests">Manage Tests</Link>
          </li>

          <li>
            <Link to="/admin/report">Reports</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  );
};