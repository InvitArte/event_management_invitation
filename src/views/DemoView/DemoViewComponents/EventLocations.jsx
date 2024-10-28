// React
import React from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { Typography, Box, Link } from "@mui/material";
import { EventInfo, ElegantButton } from "./ConfirmationModalStyles";

/**
 * @component EventLocations
 * @description Componente que muestra una lista de ubicaciones de eventos.
 * Si no hay ubicaciones, no renderiza nada.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.eventLocations - Array de objetos con información de las ubicaciones.
 *
 * @returns {React.Element|null} Un elemento React que representa las ubicaciones del evento, o null si no hay ubicaciones.
 *
 * @example
 * // Ejemplo de uso del componente
 * <EventLocations eventLocations={[
 *   { id: 1, name: "Iglesia San José", direccion: "Calle Principal 123", url: "https://maps.google.com..." },
 *   { id: 2, name: "Salón de Fiestas", direccion: "Avenida Central 456", url: "https://maps.google.com..." }
 * ]} />
 */
const EventLocations = ({ eventLocations }) => {
  if (!eventLocations || eventLocations.length === 0) return null;

  return (
    <EventInfo>
      {renderTitle(eventLocations)}
      {eventLocations.map(renderLocation)}
    </EventInfo>
  );
};

/**
 * @function renderTitle
 * @description Renderiza el título de la sección de ubicaciones.
 * @param {Array} eventLocations - Array de ubicaciones.
 * @returns {React.ReactNode} El título de la sección de ubicaciones.
 */
const renderTitle = (eventLocations) => (
  <Typography
    variant="h6"
    align="center"
    gutterBottom
    sx={titleStyles}
  >
    {eventLocations.length > 1 ? "Ubicaciones:" : "Ubicación:"}
  </Typography>
);

/**
 * @constant
 * @description Estilos para el título.
 */
const titleStyles = {
  fontFamily: "'CormorantUpright', regular",
  fontSize: "1.5rem"
};

/**
 * @function renderLocation
 * @description Renderiza una ubicación individual.
 * @param {Object} location - Objeto con información de la ubicación.
 * @param {number} index - Índice de la ubicación en el array.
 * @returns {React.ReactNode} Un elemento React que representa una ubicación individual.
 */
const renderLocation = (location, index) => (
  <Box key={location.id || index} sx={{ mb: 2, textAlign: "center" }}>
    <Typography
      variant="body1"
      gutterBottom
      sx={locationTextStyles}
    >
      {location.direccion || location.name}
    </Typography>
    {renderDirectionsButton(location)}
  </Box>
);

/**
 * @constant
 * @description Estilos para el texto de la ubicación.
 */
const locationTextStyles = {
  fontFamily: "'Prata', serif",
  fontSize: "1rem"
};

/**
 * @function renderDirectionsButton
 * @description Renderiza el botón "Cómo llegar" si hay una URL disponible.
 * @param {Object} location - Objeto con información de la ubicación.
 * @returns {React.ReactNode|null} Un elemento React que representa el botón "Cómo llegar", o null si no hay URL.
 */
const renderDirectionsButton = (location) => {
  if (!location.url) return null;

  return (
    <Link
      href={location.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: "none" }}
    >
      <ElegantButton size="small">
        Cómo llegar
      </ElegantButton>
    </Link>
  );
};

EventLocations.propTypes = {
  eventLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      direccion: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default EventLocations;