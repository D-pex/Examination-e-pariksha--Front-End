import { useNavigate } from "react-router-dom"

export default function Admin() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-6">Welcome, {user.name}</p>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/admin/create-test")}
          className="p-4 bg-green-500 text-white rounded-xl shadow"
        >
          Create Test
        </button>

        <button
          onClick={() => navigate("/admin/tests")}
          className="p-4 bg-purple-500 text-white rounded-xl shadow"
        >
          Manage Tests
        </button>

        <button
          onClick={() => navigate("/admin/reports")}
          className="p-4 bg-blue-500 text-white rounded-xl shadow"
        >
          Reports
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user")
            navigate("/")
          }}
          className="p-4 bg-red-500 text-white rounded-xl shadow"
        >
          Logout
        </button>
      </div>
    </div>
  )
}