import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authService } from "../../application/services/authService";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      initialize: async () => {
        const { accessToken, user } = get();
        if (!accessToken) {
          return;
        }

        set((state) => ({ ...state, isAuthenticated: true }));

        if (!user) {
          try {
            const profile = await authService.getProfile(accessToken);
            set((state) => ({ ...state, user: profile }));
          } catch (error) {
            console.error("Unable to load session", error);
            set(initialState);
          }
        }
      },

      login: async (email, password) => {
        try {
          const payload = await authService.login({ email, password });
          set({
            accessToken: payload.access,
            refreshToken: payload.refresh,
            user: payload.user,
            isAuthenticated: true,
          });
          return payload.user;
        } catch (error) {
          const message = error.response?.data?.detail || "Invalid credentials";
          throw new Error(message);
        }
      },

      register: async (userData) => {
        try {
          const response = await authService.register({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
          });
          return response;
        } catch (error) {
          const message =
            error.response?.data?.email?.[0] ||
            error.response?.data?.password?.[0] ||
            error.response?.data?.password_confirmation?.[0] ||
            "Registration failed";
          throw new Error(message);
        }
      },

      refreshSession: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          return null;
        }

        try {
          const payload = await authService.refresh(refreshToken);
          set((state) => ({ ...state, accessToken: payload.access }));
          return payload.access;
        } catch (error) {
          console.error("Unable to refresh session", error);
          set(initialState);
          return null;
        }
      },

      loadProfile: async () => {
        const { accessToken } = get();
        if (!accessToken) {
          return null;
        }

        const profile = await authService.getProfile(accessToken);
        set((state) => ({ ...state, user: profile, isAuthenticated: true }));
        return profile;
      },

      logout: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
