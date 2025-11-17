const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const API_BASE_URL = isLocalhost
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL;

const API_ROUTES = {
  auth: {
    login: "/api/token/",
    refresh: "/api/token/refresh/",
    register: "/api/register/",
  },
  profile: {
    details: "/api/profile/",
  },
};

export { API_BASE_URL, API_ROUTES };
