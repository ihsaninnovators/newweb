import { Navigate, Outlet } from "react-router-dom";
import { simpleAuth } from "@/lib/simpleAuth";

export default function SimpleProtectedRoute() {
  if (!simpleAuth.isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}