/**
 * @module Services/AxiosConfig
 * @description Este módulo contiene la configuración personalizada de Axios para las peticiones API.
 */

import axios from "axios";
import { API_ROUTES } from "../config";

/**
 * @constant
 * @name axiosInstance
 * @memberof module:Services/AxiosConfig
 * @description Instancia personalizada de Axios con configuración base.
 * @type {Object}
 */
const axiosInstance = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * @function
 * @name requestInterceptor
 * @memberof module:Services/AxiosConfig
 * @description Interceptor de solicitud para agregar el token de autenticación.
 * @param {Object} config - Configuración de la solicitud Axios.
 * @returns {Object} Configuración modificada con el token de autenticación.
 */
const requestInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

/**
 * @function
 * @name errorInterceptor
 * @memberof module:Services/AxiosConfig
 * @description Interceptor de error para manejar errores en las solicitudes.
 * @param {Error} error - Error capturado durante la solicitud.
 * @returns {Promise} Una promesa rechazada con el error.
 */
const errorInterceptor = (error) => Promise.reject(error);

// Agregar interceptores a la instancia de Axios
axiosInstance.interceptors.request.use(requestInterceptor, errorInterceptor);

export default axiosInstance;