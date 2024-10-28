/**
 * @module Services/ErrorHandler
 * @description Este módulo proporciona funciones para manejar errores de API de manera consistente.
 */

import { toast } from "react-toastify";
import { translateError } from "../config";

/**
 * @function
 * @name handleApiError
 * @memberof module:Services/ErrorHandler
 * @description Maneja los errores de las peticiones API, registra los detalles y muestra notificaciones.
 *
 * @param {Error} error - El objeto de error capturado.
 * @param {string} serviceName - El nombre del servicio donde ocurrió el error.
 * @throws {Error} Relanza el error original después de manejarlo.
 *
 * @example
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   handleApiError(error, 'UserService');
 * }
 */
export const handleApiError = (error, serviceName) => {
  console.error(`Error in ${serviceName}:`, error);

  if (error.response) {
    /**
     * @inner
     * @description Maneja errores con respuesta del servidor.
     */
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
    const translatedError = translateError(error);
    toast.error(`Error: ${translatedError}`);
  } else if (error.request) {
    /**
     * @inner
     * @description Maneja errores sin respuesta del servidor.
     */
    console.error("No se recibió respuesta:", error.request);
    toast.error("No hubo respuesta del servidor");
  } else {
    /**
     * @inner
     * @description Maneja errores en la configuración de la petición.
     */
    console.error("Error setting up request:", error.message);
    toast.error("Error al realizar la petición");
  }

  throw error;
};

/**
 * @typedef {Object} ErrorHandlerExports
 * @property {function} handleApiError - Función para manejar errores de API.
 */

/**
 * @type {ErrorHandlerExports}
 */
export default {
  handleApiError
};