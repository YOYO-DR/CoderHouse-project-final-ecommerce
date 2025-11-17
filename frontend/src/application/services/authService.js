import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  async login(credentials) {
    const response = await http.post("/auth/jwt/create/", credentials);
    return response.data;
  },

  async register(userData) {
    const response = await http.post("/users/register/", {
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
    });
    return response.data;
  },

  async activateAccount(uid, token) {
    const response = await http.post("/users/activate/", { uid, token });
    return response.data;
  },

  async refresh(refreshToken) {
    const response = await http.post("/auth/jwt/refresh/", { refresh: refreshToken });
    return response.data;
  },

  async getProfile(accessToken) {
    const response = await http.get("/users/me/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

export { API_BASE_URL };
