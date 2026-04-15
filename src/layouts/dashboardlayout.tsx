// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Exam System</h2>

        <ul className="space-y-3">
          <li><a href="/home">Dashboard</a></li>
          <li><a href="/tests">Tests</a></li>
          <li><a href="/create">Create Test</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </div>
    </div>
  );
};