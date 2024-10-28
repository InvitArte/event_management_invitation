/**
 * @module Config/BaseUrl
 * @description Módulo de configuración que contiene las URLs base y rutas de la API para la aplicación.
 */

/**
 * @constant {string} LOCAL_HOST
 * @memberof module:Config/BaseUrl
 * @category Environment
 * @description URL del host local para desarrollo.
 */
const LOCAL_HOST = "localhost:5173";
/**
 * @constant {string} DEMO_HOST
 * @memberof module:Config/BaseUrl
 * @category Environment
 * @description URL del host de demostración.
 */
const DEMO_HOST = "demo.invitartedesign.com";
/**
 * @constant {string} API_BASE_URL
 * @memberof module:Config/BaseUrl
 * @category Environment
 * @description URL base de la API, cambia según el entorno (local o producción).
 */
const API_BASE_URL =
  window.location.host === LOCAL_HOST
    ? "http://127.0.0.1:8000"
    : "https://api.invitartedesign.com";

/**
 * @constant {boolean} IS_DEMO
 * @memberof Config/BaseUrl
 * @category Environment
 * @description Indica si la aplicación está ejecutándose en modo demostración.
 */
export const IS_DEMO = window.location.host === DEMO_HOST;

/**
 * @constant {Object} API_ROUTES
 * @memberof module:Config/BaseUrl
 * @category API
 * @description Objeto que contiene todas las rutas de la API.
 * Cada propiedad representa una ruta específica de la API y su valor es la URL completa.
 */
export const API_ROUTES = {
  // Rutas públicas

  /**
   *  @property {string} MENUS_PUBLIC  - Ruta para obtener los menús desde la vista pública.
   */
  MENUS_PUBLIC: `${API_BASE_URL}/api/menus-public`,

  /**
   * @property {string} ALLERGIES_PUBLIC  - Ruta para obtener las alergias desde la vista pública.
   */
  ALLERGIES_PUBLIC: `${API_BASE_URL}/api/allergies-public`,

  /**
   * @property {string} LOCATIONS_PUBLIC  - Ruta para obtener las locaciones desde la vista pública.
   */
  LOCATIONS_PUBLIC: `${API_BASE_URL}/api/locations-public`,

  /**
   * @property {string} USER_PUBLIC  - Ruta para obtener la fecha del evento del usuario desde la vista pública.
   */
  USER_DATE_PUBLIC: `${API_BASE_URL}/api/user-date-public`,

  /**
   *  @property	{string} CREATE_GUEST_WITH_PLUS_ONE - Ruta para el envio del formulario público de registro de invitados
   */
  CREATE_GUEST_WITH_PLUS_ONE: `${API_BASE_URL}/api/guests-with-plus-one`,

  /**
   * @property	{string} BANK_ACCOUNT_PUBLIC - Ruta para obtener la cuenta bancaria para los regalos desde la vista pública.
   */
  BANK_ACCOUNT_PUBLIC: `${API_BASE_URL}/api/bank-account-public`,

  /**
   * @property	{string} GIFT_LIST_URL_PUBLIC - Ruta para obtener la URL de la lista de regalos desde la vista pública.
   */
  GIFT_LIST_URL_PUBLIC: `${API_BASE_URL}/api/gift-list-url-public`,

};

export default API_ROUTES;
