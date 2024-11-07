// React
import React from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { Typography, useMediaQuery, useTheme, Box } from "@mui/material";

// Estilos
import { mainBlue } from "./ConfirmationModalStyles";

/**
 * @component GiftMessage
 * @description Componente que muestra un mensaje de regalo y un número de cuenta.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.accountNumber - El número de cuenta para las contribuciones.
 *
 * @returns {React.Element} Un elemento React que representa el mensaje de regalo y el número de cuenta.
 *
 * @example
 * // Ejemplo de uso del componente
 * <GiftMessage accountNumber="DE01 2345 6789 0123 4567 8901" />
 */
const GiftMessage = ({ accountNumber }) => {

  /**
   * @constant {Object} theme - Tema actual de la aplicación.
   */
  const theme = useTheme();

  /**
   * @constant {boolean} isMobile - Determina si la vista es móvil o no.
   */
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        background: 'transparent',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
      }}
    >
      {renderGiftMessageText(theme)}
      {renderAccountNumber(accountNumber, isMobile, theme)}
    </Box>
  );
};

/**
 * @function renderGiftMessageText
 * @description Renderiza el texto del mensaje de regalo.
 * @param {Object} theme - El tema de Material-UI.
 * @returns {React.Element} Un elemento Typography con el mensaje de regalo.
 */
const renderGiftMessageText = (theme) => (
  <Typography
    variant="body1"
    align="center"
    sx={{
      fontFamily: "'Elegant_font', cursive",
      fontSize: { xs: '1.2rem', sm: '1.5rem' },
      marginBottom: theme.spacing(2),
      color: 'inherit',
    }}
  >
    Para todos aquellos que deseen colaborar en nuestra nueva vida juntos,
    os facilitamos nuestro número de cuenta:
  </Typography>
);

/**
 * @function renderAccountNumber
 * @description Renderiza el número de cuenta.
 * @param {string} accountNumber - El número de cuenta.
 * @param {boolean} isMobile - Indica si se está en una vista móvil.
 * @param {Object} theme - El tema de Material-UI.
 * @returns {React.Element} Un elemento Typography con el número de cuenta.
 */
const renderAccountNumber = (accountNumber, isMobile, theme) => (
  <Typography
    variant="body1"
    align="center"
    sx={{
      ...getAccountNumberStyles(isMobile, theme),
      color: mainBlue,
      backgroundColor: 'transparent',
      padding: theme.spacing(1, 2),
      display: 'inline-block',
    }}
  >
    {accountNumber}
  </Typography>
);

/**
 * @function getAccountNumberStyles
 * @description Obtiene los estilos para el número de cuenta.
 * @param {boolean} isMobile - Indica si se está en una vista móvil.
 * @param {Object} theme - El tema de Material-UI.
 * @returns {Object} Un objeto con los estilos para el número de cuenta.
 */
const getAccountNumberStyles = (isMobile, theme) => ({
  fontFamily: "'Roboto', sans-serif",
  fontStyle: "italic",
  letterSpacing: "0.5px",
  fontWeight: 500,
  fontSize: isMobile ? "0.9rem" : "1rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});

GiftMessage.propTypes = {
  accountNumber: PropTypes.string.isRequired,
};

export default GiftMessage;