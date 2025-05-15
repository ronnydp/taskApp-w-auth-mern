import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  return <Outlet />; //Esto es para que se rendericen las rutas hijas
}

export default ProtectedRoute;
