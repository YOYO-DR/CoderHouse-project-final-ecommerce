import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { API_BASE_URL, API_ROUTES } from "../../api/baseVariables";

class UserService {
  // Métodos de almacenamiento
  getUser = () => {
    return useAuthStore.getState().user
    // const user = useAuthStore.getState().user;
    // return user ? User.fromApiResponse(user) : null;
  };

  getAccessToken = () => {
    // Si guardas tokens en el estado de Zustand
    const state = useAuthStore.getState();
    return state?.access || null;
  };

  getRefreshToken = () => {
    // Si guardas tokens en el estado de Zustand
    const state = useAuthStore.getState();
    return state?.refresh || null;
  };

  setUserData = async (data) => {
    // Actualizamos el estado con Zustand
    await useAuthStore
      .getState()
      .login(data.user, { access: data.access, refresh: data.refresh });
  };

  clearUserData = () => {
    useAuthStore.getState().logout();
  };

  // Métodos API
  loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, {
        username,
        password,
      });
      this.setUserData(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango de 2xx
        throw new Error(error.response.data.detail || "Login failed");
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        throw new Error("No response from server");
      } else {
        // Ocurrió un error al configurar la solicitud
        throw new Error(error.message);
      }
    }
  };

  verifyAndRefreshTokens = async (token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
        refresh:token,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango de 2xx
        throw new Error(
          error.response.data.detail || "Token verification failed"
        );
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        throw new Error("No response from server");
      } else {
        // Ocurrió un error al configurar la solicitud
        throw new Error(error.message);
      }
    }
  };

  isAuthenticated = async () => {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearUserData();
      return false;
    }

    try {
      const newRefresh = await this.verifyAndRefreshTokens(refreshToken);
      if (newRefresh) {
        this.setUserData({
          access: newRefresh.access,
          refresh: refreshToken, // El token de actualización generalmente no cambia
          user: useAuthStore.getState().user,
        });

        return true;
      }
      console.log("Token no válido");
      this.clearUserData();
      return false;
    } catch (error) {
      console.error("Error verifying token:", error);
      this.clearUserData();
      return false;
    }
  };

  // No se usa en el frontend, pero se deja para referencia
  /*registerUser = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register/`, data);
      this.setUserData(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };*/
}

// Instancia singleton
export const userService = new UserService();
