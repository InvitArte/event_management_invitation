/**
 * @module Config/Config
 * @description Módulo que contiene la configuración por defecto de la aplicación.
 * Esta configuración se utiliza en caso de que falle la carga desde el backend.
 */

/**
 * @constant {Object} defaultConfig
 * @memberof module:Config/Config
 * @category Configuration
 * @description Objeto que contiene la configuración por defecto de la aplicación.
 * Cada propiedad representa una configuración específica de la aplicación.
 */
export const defaultConfig = {
  /**
   * @property {number} userId - ID del usuario por defecto.
   */
  userId: 6,

  /**
   * @property {number} numPlusOne - Número de acompañantes permitidos por defecto.
   */
  numPlusOne: 1,

  /**
   * @property {Object} guestViewColumns - Configuración de las columnas visibles en la vista de invitados.
   * @description Cada propiedad representa una columna y su valor booleano indica si debe mostrarse.
   */
  guestViewColumns: {
    id: true,
    fullName: true,
    email: true,
    phone: true,
    validated: true,
    menu: true,
    allergy: true,
    needs_hotel: true,
    needs_transport: true,
    needs_transport_back: true,
    disability: true,
    observations: true,
    accommodation_plan: true,
    isMainGuest: true,
    tags: true,
  },

  /**
   * @property {Object} guestViewFilters - Configuración de los filtros disponibles en la vista de invitados.
   * @description Cada propiedad representa un filtro y su valor booleano indica si debe estar disponible.
   */
  guestViewFilters: {
    full_name: true,
    phone: true,
    menu: true,
    allergy: true,
    needs_hotel: true,
    needs_transport: true,
    needs_transport_back: true,
    validated: true,
    tags: true,
    accommodation_plan: true,
  },

  /**
   * @property {Object} guestFormFields - Configuración de los campos visibles en el formulario de invitados.
   * @description Cada propiedad representa un campo y su valor booleano indica si debe mostrarse en el formulario.
   */
  guestFormFields: {
    first_name: true,
    last_name: true,
    phone: true,
    email: true,
    needs_transport: true,
    needs_transport_back: true,
    needs_hotel: true,
    disability: true,
    menu: true,
    allergy: true,
    observations: true,
    accommodation_plan: true,
    tags: true,
    plus_ones: true,
    plus_one_first_name: true,
    plus_one_last_name: true,
    plus_one_menu: true,
    plus_one_allergy: true,
    plus_one_disability: true,
  },

  /**
   * @property {Object} profileViewFields - Configuración de los campos visibles en la vista de perfil.
   * @description Cada propiedad representa un campo y su valor booleano indica si debe mostrarse en la vista de perfil.
   */
  profileViewFields: {
    bankAccount: true,
    giftList: true,
  },
  /**
   *  @property {Object} notificationConfig - Configuración de las notificaciones.
   *  @description Cada propiedad representa un tipo de notificación y su valor es un objeto con la configuración.
   */
  notificationConfig: {
    capacityNotification: true,
  }
};


export default defaultConfig;
