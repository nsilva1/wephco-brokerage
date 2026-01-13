import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, role, loading } = useAuth();

  if (loading) return <div>Checking permissions...</div>;

  // If not logged in, go to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but NOT an admin, go to an "Unauthorized" page or Home
  if (role !== "Admin") {
    return <Navigate to="/error" replace />;
  }

  return <>{children}</>;
};

export { AdminRoute };