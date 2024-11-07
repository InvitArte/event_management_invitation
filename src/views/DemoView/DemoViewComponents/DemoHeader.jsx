// React
import React from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

// Componentes propios
import { ConfirmButton } from "./index";

// Assets y estilos
import { mainBlue } from "./index";
import { Opacity } from "@mui/icons-material";

/**
 * @component DemoHeader
 * @description Componente que representa el encabezado de la invitación de boda de la vista Demo.
 * Muestra el título del evento, los nombres de la pareja y un botón de confirmación.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onOpenModal - Función para abrir el modal de confirmación.
 *
 * @returns {React.Element} Un elemento React que representa el encabezado de la invitación.
 *
 * @example
 * // Ejemplo de uso del componente
 * <DemoHeader onOpenModal={() => setModalOpen(true)} />
 */
const DemoHeader = ({ onOpenModal }) => {

  /**
   * @constant {Object} theme - Tema actual de la aplicación.
   */
  const theme = useTheme();

  /**
   * @constant {boolean} isMobile - Determina si la vista es móvil o no.
   */
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={getContainerStyles(isMobile)}>
      <Box sx={getTitleContainerStyles(isMobile)}>
        <Typography variant="h2" sx={getSubtitleStyles()}>
          -18 de Octubre, 2025-
        </Typography>
        <Typography variant="h1" sx={getTitleStyles()}>
          Maria <span style={getAmpersandStyles()}>&</span> Thibault
        </Typography>
        {/* <Box sx={getButtonContainerStyles()}>
          <ConfirmButton onClick={onOpenModal} fullWidth={isMobile} />
        </Box> */}
      </Box>
    </Box>
  );
};

/**
 * @function getContainerStyles
 * @description Obtiene los estilos para el contenedor principal del encabezado.
 * @param {boolean} isMobile - Indica si se está en vista móvil.
 * @returns {Object} Objeto de estilos para el contenedor principal.
 */
const getContainerStyles = (isMobile) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: isMobile ? "20px" : "40px",
});

/**
 * @function getTitleContainerStyles
 * @description Obtiene los estilos para el contenedor del título.
 * @param {boolean} isMobile - Indica si se está en vista móvil.
 * @returns {Object} Objeto de estilos para el contenedor del título.
 */
const getTitleContainerStyles = (isMobile) => ({
  padding: isMobile ? "20px 40px" : "40px 80px",
  //backgroundColor: "rgba(255, 255, 255, 0.4)",
  //backdropFilter: "blur(0px)",
  //borderRadius: "2px",
  //boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  //border: "1px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: isMobile ? "auto" : "80%",
  maxWidth: "800px",
});

/**
 * @function getSubtitleStyles
 * @description Obtiene los estilos para el subtítulo.
 * @returns {Object} Objeto de estilos para el subtítulo.
 */
const getSubtitleStyles = () => ({
  fontFamily: "'Elegant_font', bold",
  fontSize: { xs: "1.4rem", sm: "1.5rem" },
  color: "white", // Cambiado de "black" a "white"
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Cambiado para sombra negra
  marginBottom: "5px",
});

const getTitleStyles = () => ({
  fontFamily: "'Elegant_font', bold",
  fontSize: { xs: "2.5rem", sm: "3.5rem" },
  color: "white", // Añadido color blanco
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Corregido para dar sombra negra
  textAlign: "center",
  lineHeight: 1.2,
});

/**
 * @function getAmpersandStyles
 * @description Obtiene los estilos para el símbolo '&' en el título.
 * @returns {Object} Objeto de estilos para el símbolo '&'.
 */
const getAmpersandStyles = () => ({
  fontSize: "1.5em",
  color: mainBlue,
  verticalAlign: "middle",
});

/**
 * @function getButtonContainerStyles
 * @description Obtiene los estilos para el contenedor del botón de confirmación.
 * @returns {Object} Objeto de estilos para el contenedor del botón.
 */
const getButtonContainerStyles = () => ({
  marginTop: "20px",
  width: { xs: "100%", sm: "auto" },
});

DemoHeader.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default DemoHeader;