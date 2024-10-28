// ACTUALMENTE LOS ENLACES DE POLÍTICA DE PRIVACIDAD Y TÉRMINOS Y CONDICIONES NO ESTÁN IMPLEMENTADOS
/**
 * @module UI/Common
 * @description Este módulo contiene un componente reutilizable para el pie de página de la aplicación.
 */
// React
import React from "react";

// Material-UI
import { Box, Typography, Link, Container } from "@mui/material";
import { styled } from "@mui/system";

// Estilos personalizados usando los colores y fuentes del sistema
const FooterBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(6, 0),
  borderTop: "1px solid rgba(141, 84, 68, 0.1)",
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'CormorantUpright', regular",
  fontSize: "2rem",
  color: "#8D5444",
  marginBottom: theme.spacing(2),
}));

const FooterCopyright = styled(Typography)(({ theme }) => ({
  fontFamily: "'Prata', serif",
  fontSize: "1rem",
  color: "#231f20",
  opacity: 0.8,
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  fontFamily: "'Prata', serif",
  color: "#8D5444",
  textDecoration: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#774436",
    textDecoration: "none",
  },
}));
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
    <FooterBox component="footer">
      <Container maxWidth="lg">
        <FooterTitle variant="h6" align="center" gutterBottom>
          InvitArte
        </FooterTitle>
        <FooterCopyright
          variant="subtitle1"
          align="center"
          component="p"
        >
          © {new Date().getFullYear()} InvitArte. Todos los derechos reservados.
        </FooterCopyright>
        <Typography variant="body2" align="center">
          <FooterLink href="#">
            Política de Privacidad
          </FooterLink>
          {" | "}
          <FooterLink href="#">
            Términos y Condiciones
          </FooterLink>
        </Typography>
      </Container>
    </FooterBox>
  );
};

export default Footer;