import { Navigate } from "react-router-dom";
import { getValidAccessToken } from "../lib/auth";

export default function ProtectedRoute({ children }) {
  const accessToken = getValidAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
