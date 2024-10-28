//React
import React from "react";

//Bibliotecas de terceros
import PropTypes from "prop-types";

//Material-UI
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * @component StyledDateTypography
 * @description Tipografía estilizada para la fecha del evento.
 */
const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontSize: "1.2rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

/**
 * @component EventDate
 * @description Componente que muestra la fecha del evento con un estilo personalizado.
 * Si no se proporciona una fecha, muestra un mensaje predeterminado.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.eventDateString - Cadena de texto con la fecha del evento.
 *
 * @returns {React.Element} Un elemento React que representa la fecha del evento.
 *
 * @example
 * // Ejemplo de uso del componente
 * <EventDate eventDateString="31 de Diciembre, 2024" />
 */
const EventDate = ({ eventDateString }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <StyledDateTypography variant="h6">
      {eventDateString || "Fecha no disponible"}
    </StyledDateTypography>
  </Box>
);

EventDate.propTypes = {
  eventDateString: PropTypes.string.isRequired,
};

export default EventDate;