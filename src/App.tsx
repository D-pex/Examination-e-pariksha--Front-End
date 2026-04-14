import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./features/auth/pages/login"
import Admin from "./features/admin/admin"
import List from "./features/test/pages/list"
import Attempt from "./features/test/pages/attempt"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tests"
          element={
            <ProtectedRoute role="User">
              <List />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tests/attempt/:attemptId"
          element={
            <ProtectedRoute role="User">
              <TestAttempt />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}