import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./feature/auth/Login";
import { Register } from "./feature/auth/Register";
import { Home } from "./feature/dashboard/Home";

import { TestList } from "./feature/test/TestList";
import { CreateTest } from "./feature/test/CreateTest";
import { AttemptTest } from "./feature/test/AttemptTest";

import { DashboardLayout } from "./layouts/DashboardLayout";
import { AuthLayout } from "./layouts/AuthLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

        {/* Dashboard Routes */}
        <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/tests" element={<DashboardLayout><TestList /></DashboardLayout>} />
        <Route path="/create" element={<DashboardLayout><CreateTest /></DashboardLayout>} />

        {/* Attempt Test */}
        <Route path="/attempt/:id" element={<AttemptTest />} />

      </Routes>
    </BrowserRouter>
  );
}

