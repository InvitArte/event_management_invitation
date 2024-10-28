/**
 * @module Utils/DateUtils
 * @description Módulo que contiene funciones de utilidad para el manejo y formateo de fechas.
 */

/**
 * @function
 * @name formatDateToString
 * @memberof module:Utils/DateUtils
 * @category Date Helpers
 * @description Formatea una fecha a string en español.
 *
 * @param {Date} date - La fecha a formatear.
 * @returns {string} La fecha formateada como string en español.
 *
 * @example
 * import { formatDateToString } from './DateUtils';
 *
 * const fecha = new Date(2024, 9, 19);
 * const fechaFormateada = formatDateToString(fecha);
 * console.log(fechaFormateada); // "19 de octubre de 2024"
 */
export const formatDateToString = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};


/**
 * @function
 * @name formatDateForCalendar
 * @memberof module:Utils/DateUtils
 * @category Date Helpers
 * @description Formatea una fecha para su uso en la URL del calendario de Google.
 * Esta función convierte la fecha a formato ISO, elimina los guiones y los dos puntos,
 * y añade una 'Z' al final para indicar que es UTC.
 *
 * @param {Date} date - La fecha a formatear.
 * @returns {string} La fecha formateada para su uso en la URL del calendario de Google.
 *
 * @example
 * import { formatDateForCalendar } from './DateUtils';
 *
 * const fecha = new Date(2024, 9, 19, 15, 30);
 * const fechaFormateada = formatDateForCalendar(fecha);
 * console.log(fechaFormateada); // "20241019T153000Z"
 */
export const formatDateForCalendar = (date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";