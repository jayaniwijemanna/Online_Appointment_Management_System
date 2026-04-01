import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const ok = localStorage.getItem("adminLoggedIn") === "true";
  return ok ? children : <Navigate to="/admin" replace />;
}
