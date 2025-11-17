import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { userService } from "../domain/services/UserService";
import { API_BASE_URL, API_ROUTES } from "../api/baseVariables";

const axiosService = axios.create({
  // creo una instancia de axios
  baseURL: `${API_BASE_URL}/api`, // se obtiene la URL base desde la variable de entorno en Vite
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  // esto es un interceptor, en este caso es para los request, se ejecuta antes de que se haga la solicitud
  /**
  * Recuperar el token de acceso de localStorage y agregarlo a los encabezados de
la solicitud
  */

  config.headers.Authorization = `Bearer ${userService.getAccessToken()}`;
  return config;
});

// Interceptor para manejar errores de respuesta, aunque esto es algo que ya se hace por defecto en axios, pero se puede personalizar
axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err)
);

// esta funcion se ejecutara cuando el token de acceso haya expirado, osea que reciba un codigo de estado 401 - no autorizado
const refreshAuthLogic = async (failedRequest) => {
  // el failedRequest es la solicitud que fallo, en este caso es la solicitud que fallo por el token de acceso

  // se hace una solicitud para obtener un nuevo token de acceso, como se observa, no se ejecuta con axiosService, sino con axios, ya que axiosService tiene un interceptor que se ejecuta antes de hacer la solicitud, y en este caso no se quiere que se ejecute
  const localRefreshToken = userService.getRefreshToken();
  return axios
    .post(
      "/api/token/refresh/",
      {
        refresh: localRefreshToken,
      },
      {
        baseURL: API_BASE_URL, // configuración de la solicitud
      }
    )
    .then((resp) => {
      const { access } = resp.data; // se obtiene el nuevo token de acceso que retorna la petición

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + access; // se agrega el nuevo token de acceso a los encabezados de la solicitud que fallo, el cual se ejecutara de nuevo

      userService.setUserData({
        access,
        refresh: localRefreshToken, // el token de actualización generalmente no cambia
        user: userService.getUser(),
      });
    })
    .catch(() => {
      // si falla la solicitud para obtener un nuevo token de acceso, se elimina el token de acceso y el token de actualizacion del localStorage
      userService.clearUserData();
    });
};

// se crea un interceptor para manejar la actualizacion del token de acceso, cada que se ejecute una solicitud y se reciba un codigo de estado 401 - no autorizado, se ejecutara la funcion refreshAuthLogic
createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export async function fetcher(url) {
  // funcion para las peticiones get, se ejecuta con axiosService
  return axiosService.get(url).then((res) => res.data);
}
export async function fetcherWithParams(url, params) {
  // funcion para las peticiones get con parametros, se ejecuta con axiosService
  return axiosService.get(url, { params }).then((res) => res.data);
}
export default axiosService;
