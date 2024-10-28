/**
 * @module Services/PublicAxios
 * @description Configuración y servicios de Axios para la parte pública de la aplicación
 */

import axios from "axios";
import { API_ROUTES } from "../config";
import { toast } from "react-toastify";

/**
 * Instancia de Axios específica para endpoints públicos
 */
const publicAxiosInstance = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Interceptor para manejar errores en las peticiones públicas
 */
publicAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("Error en la petición pública:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      toast.error(`Error: ${error.response.data.message || 'Ha ocurrido un error'}`);
    } else if (error.request) {
      console.error("No se recibió respuesta:", error.request);
      toast.error("No se pudo conectar con el servidor");
    } else {
      console.error("Error en la configuración:", error.message);
      toast.error("Error al realizar la petición");
    }

    return Promise.reject(error);
  }
);

/**
 * Servicios públicos de la API
 */
const publicServices = {
  /**
   * Obtiene los menús públicos
   * @param {string|number} userId - ID del usuario
   * @returns {Promise<Array>} Array de menús
   */
  getMenus: async (userId) => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.MENUS_PUBLIC, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo menús:", error);
      return [];
    }
  },

  /**
   * Obtiene las alergias
   * @returns {Promise<Array>} Array de alergias
   */
  getAllergies: async () => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.ALLERGIES_PUBLIC);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo alergias:", error);
      return [];
    }
  },

  /**
   * Obtiene las ubicaciones del evento
   * @param {string|number} userId - ID del usuario
   * @returns {Promise<Array>} Array de ubicaciones
   */
  getLocations: async (userId) => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.LOCATIONS_PUBLIC, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo ubicaciones:", error);
      return [];
    }
  },

  /**
   * Obtiene la fecha del evento
   * @param {string|number} userId - ID del usuario
   * @returns {Promise<Object>} Información de la fecha
   */
  getUserDate: async (userId) => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.USER_DATE_PUBLIC, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo fecha del evento:", error);
      return null;
    }
  },

  /**
   * Obtiene la información bancaria
   * @param {string|number} userId - ID del usuario
   * @returns {Promise<Object>} Información bancaria
   */
  getBankAccount: async (userId) => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.BANK_ACCOUNT_PUBLIC, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo información bancaria:", error);
      return null;
    }
  },

  /**
   * Obtiene la URL de la lista de regalos
   * @param {string|number} userId - ID del usuario
   * @returns {Promise<Object>} Información de la lista de regalos
   */
  getGiftListUrl: async (userId) => {
    try {
      const response = await publicAxiosInstance.get(API_ROUTES.GIFT_LIST_URL_PUBLIC, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo URL de lista de regalos:", error);
      return null;
    }
  },

  /**
   * Crea un invitado con acompañante
   * @param {Object} guestData - Datos del invitado principal
   * @param {Object} plusOneData - Datos del acompañante
   * @returns {Promise<Object>} Información del invitado creado
   */
  createGuestWithPlusOne: async (guestData, plusOneData) => {
    try {
      const response = await publicAxiosInstance.post(
        API_ROUTES.CREATE_GUEST_WITH_PLUS_ONE,
        {
          guest: guestData,
          plus_one: plusOneData
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creando invitado con acompañante:", error);
      throw error;
    }
  }
};

// Exportamos publicServices como default
export default publicServices;

// Exportamos la instancia de axios por si es necesaria
export { publicAxiosInstance };