import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login, Register } from "./features/auth";
import { Home } from "./features/dashboard/Home";
import Admin from "./features/admin/admin";
import { AttemptTest, CreateTest, TestList } from "./features/test";
import { Question } from "./features/question/question";
import { Report } from "./features/admin/Report";
import { DashboardLayout } from "./layouts/dashboardlayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Result } from "./features/result/Result";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Admin />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/create-test"
          element={
            <AdminLayout>
              <CreateTest />
            </AdminLayout>
          }
        />

        <Route
          path="/create-question/:testId"
          element={
            <AdminLayout>
              <Question />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/tests"
          element={
            <AdminLayout>
              <TestList />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/report"
          element={
            <AdminLayout>
              <Report />
            </AdminLayout>
          }
        />

        <Route
          path="/tests"
          element={
            <DashboardLayout>
              <TestList />
            </DashboardLayout>
          }
        />

        <Route
          path="/attempt/:testId"
          element={
            <DashboardLayout>
              <AttemptTest />
            </DashboardLayout>
          }
        />

        <Route
          path="/result"
          element={
            <DashboardLayout>
              <Result />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}