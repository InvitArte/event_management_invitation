// ACTUALMENTE LOS ENLACES DE POLÍTICA DE PRIVACIDAD Y TÉRMINOS Y CONDICIONES NO ESTÁN IMPLEMENTADOS
/**
 * @module UI/Common
 * @description Este módulo contiene un componente reutilizable para el pie de página de la aplicación.
 */
// React
import React from "react";

// Material-UI
import { Box, Typography, Link, Container } from "@mui/material";

/**
 * @component
 * @name module:Footer
 * @memberof UI/Common
 * @category Layout
 * @description Componente de pie de página para la aplicación Gestor de Eventos.
 * Muestra el nombre de la aplicación, el año actual, los derechos de autor,
 * y enlaces a la política de privacidad y los términos y condiciones.
 *
 * @returns {React.Element} Un componente Box de Material-UI que contiene el pie de página.
 *
 * @example
 * <Footer />
 */
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Gestor de Eventos
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          © {new Date().getFullYear()} InvitArte. Todos los derechos
          reservados.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="#">
            Política de Privacidad
          </Link>
          {" | "}
          <Link color="inherit" href="#">
            Terminos y Condiciones
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
