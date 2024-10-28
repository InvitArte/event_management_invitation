// React
import React from "react";

// Material-UI
import { Typography } from "@mui/material";

/**
 * @component EventTitle
 * @description Componente que renderiza el título del evento.
 * Actualmente muestra un título estático "Titulo", pero podría ser modificado
 * para aceptar un prop con el título como texto dinámico en el futuro.
 *
 * @returns {React.Element} Un elemento React que representa el título del evento.
 *
 * @example
 * // Ejemplo de uso del componente
 * <EventTitle />
 */
const EventTitle = () => (
  <Typography
    variant="h4"
    component="div"
    gutterBottom
    align="center"
    sx={titleStyles}
  >
    Titulo
  </Typography>
);

/**
 * @constant
 * @description Estilos para el título del evento.
 */
const titleStyles = {
  // Aquí se pueden agregar los estilos específicos para el título
};

export default EventTitle;