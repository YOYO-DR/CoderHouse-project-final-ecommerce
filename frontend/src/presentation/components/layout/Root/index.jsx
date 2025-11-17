import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useThemeStore } from "../../../hooks/useThemeStore";
import { useAuthStore } from "../../../hooks/useAuthStore"
import { useEffect } from "react";

/**
 * Componente Root que envuelve toda la aplicación.
 */
const Root = () => {
  const { theme } = useThemeStore();
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (initializeAuth) {
      initializeAuth();
    }
  }, [initializeAuth]);
  
  return (
    <>
      {/* Outlet renderiza el componente de la ruta actual */}
      <Outlet />

      {/* ToastContainer para mostrar notificaciones en toda la aplicación */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

export default Root;
