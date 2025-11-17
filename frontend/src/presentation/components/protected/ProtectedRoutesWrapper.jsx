import { useAuthStore } from "../../hooks/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { routePaths } from "../../../routers";

function ProtectedRoutesWrapper() {
  const { isAuthenticated } = useAuthStore();

  // Redireccionar si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={routePaths.login} replace />;
  }

  return <Outlet />;

}

export default ProtectedRoutesWrapper;