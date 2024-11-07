import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ConfirmButton } from "./index";
import { mainBlue } from "./index";
import M_H_fondo from "../../../assets/imgs/M_H_fondo.jpeg";
import MainDesktop from "../../../assets/imgs/Main_desktop.jpeg";

const DemoHeader = ({ onOpenModal }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={getContainerStyles(isMobile)}>
      <Box sx={getTitleContainerStyles(isMobile)}>
        <Box sx={getNameContainerStyles()}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', right: '14%' }}>
            <Typography variant="h1" sx={getNameStyles()}>
              María
            </Typography>
          </Box>
          <Box sx={getSecondLineStyles()}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h1" component="span" sx={getAmpersandStyles()}>
                &
              </Typography>
              <Typography variant="h1" component="span" sx={getNameStyles()}>
                Thibault
              </Typography>
            </Box>
          </Box>
          <Typography variant="h2" sx={getSubtitleStyles()}>
            SAVE THE DATE
          </Typography>
          <Typography variant="h2" sx={getDateStyles()}>
            -18·OCT·2025-
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const getContainerStyles = (isMobile) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  position: "relative",
  backgroundImage: isMobile ? `url(${M_H_fondo})` : `url(${MainDesktop})`,
  backgroundColor: isMobile ? 'transparent' : 'transparent',
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  boxShadow: "2px 26px 13px -8px rgba(0,0,0,0.5)",
  marginBottom: 0,
  borderBottom: 0,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isMobile ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.5)",
  },
  "&::after": {
    display: 'none' // Eliminar el after que podría estar creando espacio
  }
});


const getTitleContainerStyles = (isMobile) => ({
  position: "relative",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "1400px",
  zIndex: 1,
});

const getNameContainerStyles = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
});

const getSecondLineStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
});

const getSubtitleStyles = () => ({
  fontFamily: "'CormorantUpright', bold",
  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
  color: "white",
  letterSpacing: "0.3em",
  marginTop: "4rem",
  textAlign: "center",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
});

const getDateStyles = () => ({
  fontFamily: "'CormorantUpright', bold",
  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
  color: "white",
  letterSpacing: "0.2em",
  marginTop: "1rem",
  textAlign: "center",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
});

const getNameStyles = () => ({
  fontFamily: "'Elegant_font', bold",
  fontSize: {
    xs: "7rem",
    sm: "8rem",
    md: "12rem",
    lg: "15rem"
  },
  color: "#4a4d4b",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  lineHeight: 0.8,
  letterSpacing: "0.05em",
  fontWeight: 300,
  whiteSpace: "nowrap",
});

const getAmpersandStyles = () => ({
  fontFamily: "'Elegant_font', bold",
  fontSize: {
    xs: "7rem",
    sm: "8rem",
    md: "12rem",
    lg: "15rem"
  },
  color: mainBlue,
  verticalAlign: "middle",
  lineHeight: 0.8,
  fontWeight: 300,
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  marginRight: "0 rem",
});

DemoHeader.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default DemoHeader;