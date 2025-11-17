import { create } from "zustand";
import { persist } from "zustand/middleware";

// Creamos el store de autenticación utilizando Zustand y persistencia
export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null, // Inicialmente, el usuario no está autenticado
      access: null, // Token de acceso
      refresh: null, // Token de actualización
      isAuthenticated: false, // Estado de autenticación

      // Función para guardar los datos del inicio de sesión
      login: async (userData, tokens) => {
        set({
          user: userData, // Guardamos los datos del usuario
          access: tokens.access, // Guardamos el token de acceso
          refresh: tokens.refresh, // Guardamos el token de actualización
          isAuthenticated: true, // Marcamos al usuario como autenticado
        });
      },

      // Función para cerrar sesión
      logout: () =>
        set({
          user: null,
          access: null,
          refresh: null,
          isAuthenticated: false,
        }),

      // Función para actualizar la autenticación
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: "auth-settings", // Nombre para el almacenamiento en localStorage
      partialize: (state) => ({
        user: state.user,
        access: state.access,
        refresh: state.refresh,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
