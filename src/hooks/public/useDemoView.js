/**
 * @module Hooks/useDemoView
 * @category Custom Hooks
 * @subcategory Public
 * @description Custom hook para manejar la lógica de la vista Demo, que muestra información del evento.
 */
import { useState, useEffect, useCallback } from "react";
import publicServices from "../../services/publicAxiosConfig";

/**
 * @typedef {Object} useDemoViewReturn
 * @property {boolean} isLoading - Indica si los datos están cargando
 * @property {EventData|null} eventData - Datos procesados del evento
 * @property {string|null} error - Mensaje de error, si lo hay
 * @property {boolean} isModalOpen - Indica si el modal está abierto
 * @property {Function} handleOpenModal - Función para abrir el modal
 * @property {Function} handleCloseModal - Función para cerrar el modal
 * @property {Array} menus - Lista de menús disponibles
 * @property {Array} allergies - Lista de alergias disponibles
 */

/**
 * @typedef {Object} EventData
 * @property {Date|null} eventDate - Fecha del evento
 * @property {string} eventDateString - Fecha del evento formateada como string
 * @property {Array<Object>} eventLocations - Lista de ubicaciones del evento
 */

/**
 * @function
 * @name useDemoView
 * @memberof Hooks/useDemoView
 * @category Custom Hooks
 * @description Custom hook para manejar la lógica de la vista Demo, que muestra información del evento.
 *
 * @param {string} userId - ID del usuario asociado al evento
 *
 * @returns {useDemoViewReturn} Los valores y funciones necesarios para la vista Demo
 */
const useDemoView = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [allergies, setAllergies] = useState([]);

  /**
   * @function
   * @name fetchEventData
   * @memberof Hooks/useDemoView
   * @category Data Fetching
   * @description Obtiene todos los datos necesarios del evento y opciones del servicio.
   */
  const fetchEventData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [dateResponse, locationsResponse, menusData, allergiesData] = await Promise.all([
        publicServices.getUserDate(userId),
        publicServices.getLocations(userId),
        publicServices.getMenus(userId),
        publicServices.getAllergies()
      ]);

      setMenus(Array.isArray(menusData) ? menusData : []);
      setAllergies(Array.isArray(allergiesData) ? allergiesData : []);

      const processedEventData = processEventData(
        dateResponse,
        locationsResponse
      );
      setEventData(processedEventData);
    } catch (error) {
      console.error("Error al obtener los datos del evento:", error);
      setError(
        "No se pudieron cargar los datos del evento. Por favor, intente nuevamente más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  /**
   * @function
   * @name processEventData
   * @memberof Hooks/useDemoView
   * @category Data Processing
   * @description Procesa los datos brutos del evento en un formato utilizable.
   * @param {Object} dateResponse - Respuesta del servicio con la fecha del evento
   * @param {Array} locationsResponse - Respuesta del servicio con las ubicaciones del evento
   * @returns {EventData} Datos procesados del evento
   */
  const processEventData = (dateResponse, locationsResponse) => {
    let eventDate = null;
    let eventDateString = "";

    if (dateResponse && dateResponse.date) {
      eventDate = parseEventDate(dateResponse.date);
      eventDateString = formatEventDate(eventDate);
    }

    const eventLocations = Array.isArray(locationsResponse)
      ? locationsResponse
      : [];

    return { eventDate, eventDateString, eventLocations };
  };

  /**
   * @function
   * @name parseEventDate
   * @memberof Hooks/useDemoView
   * @category Data Processing
   * @description Analiza una cadena de fecha y la convierte en un objeto Date.
   * @param {string} dateString - Cadena de fecha a analizar
   * @returns {Date|null} Objeto Date si el análisis es exitoso, null en caso contrario
   */
  const parseEventDate = (dateString) => {
    const [year, month, day, hour, minute] = dateString.split(" ").map(Number);
    const parsedDate = new Date(year, month - 1, day, hour, minute);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  /**
   * @function
   * @name formatEventDate
   * @memberof Hooks/useDemoView
   * @category Data Processing
   * @description Formatea un objeto Date en una cadena legible.
   * @param {Date} date - Fecha a formatear
   * @returns {string} Fecha formateada como string
   */
  const formatEventDate = (date) => {
    if (!date) return "";
    const formattedDate = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}h`;
  };

  /**
   * @function
   * @name handleOpenModal
   * @memberof Hooks/useDemoView
   * @category Event Handlers
   * @description Abre el modal.
   */
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  /**
   * @function
   * @name handleCloseModal
   * @memberof Hooks/useDemoView
   * @category Event Handlers
   * @description Cierra el modal.
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  return {
    isLoading,
    eventData,
    error,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    menus,
    allergies
  };
};

export default useDemoView;