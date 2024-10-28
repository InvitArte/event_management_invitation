/**
 *  @module UI/Demo
 *  @description Este módulo contiene componentes relacionados con la vista de demostración pública de eventos.
 */
// React
import React from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Componentes estilizados
import { ElegantButton } from "./ConfirmationModalStyles";

/**
 * @component
 * @name ConfirmButton
 * @memberof module:UI/Demo
 * @category UI
 * @description Componente que renderiza un botón de confirmación de asistencia.
 * Utiliza el estilo ElegantButton y puede ajustarse a ancho completo.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onClick - Función a ejecutar al hacer clic en el botón.
 * @param {string} [props.className] - Clase CSS adicional para el botón (opcional).
 * @param {boolean} [props.fullWidth] - Si es true, el botón ocupará todo el ancho disponible (opcional).
 *
 * @returns {React.Element} Un elemento React que representa el botón de confirmación.
 *
 * @example
 * // Ejemplo de uso del componente
 * <ConfirmButton
 *   onClick={() => console.log('Confirmación clicked')}
 *   fullWidth={true}
 * />
 */
const ConfirmButton = ({ onClick, className, fullWidth }) => {
  return (
    <ElegantButton
      onClick={onClick}
      fullWidth={fullWidth}
      className={className}
    >
      Confirmar asistencia
    </ElegantButton>
  );
};

ConfirmButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default ConfirmButton;