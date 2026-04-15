import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layouts/Authlayout";
import { Login, Register } from "./features/auth";
import { DashboardLayout } from "./layouts/dashboardlayout";
import { AttemptTest, CreateTest, TestList } from "./features/test";
import { Home } from "./features/dashboard/Home";
import { Report } from "./features/admin/Report";
import Admin from "./features/admin/admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

        <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/tests" element={<DashboardLayout><TestList /></DashboardLayout>} />
        <Route path="/create" element={<DashboardLayout><CreateTest /></DashboardLayout>} />

        <Route path="/attempt/:id" element={<AttemptTest />} />

        <Route path="/admin" element={<DashboardLayout><Admin /></DashboardLayout>} />
        <Route path="/admin/create-test" element={<DashboardLayout><CreateTest /></DashboardLayout>} />
        <Route path="/admin/tests" element={<DashboardLayout><TestList /></DashboardLayout>} />
        <Route path="/admin/reports" element={<DashboardLayout><Report /></DashboardLayout>} />

      </Routes>
    </BrowserRouter>
  );
}