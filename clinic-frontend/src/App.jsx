import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGuard from "./components/AdminGuard";

export default function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}
