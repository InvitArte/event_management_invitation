/**
 * @module UI/Common
 * @description Este módulo contiene componentes reutilizables para la interfaz de usuario común.
 */

// React
import React from "react";
// Material-UI
import { Box, LinearProgress, keyframes } from "@mui/material";
// Assets
import DemoLogo from "../../../assets/imgs/demo_logo.png";

/**
 * @component
 * @name LoadingComponent
 * @memberof module:UI/Common
 * @description Componente de carga que muestra una animación de logo o una barra de progreso.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isLoading - Indica si el componente debe mostrar el estado de carga.
 * @param {string} [props.type="bar"] - Tipo de indicador de carga ("svg" para logo animado, "bar" para barra de progreso).
 *
 * @returns {React.Element} Un componente Box de Material-UI que contiene el indicador de carga.
 *
 * @example
 * <LoadingComponent isLoading={true} type="svg" />
 */
const LoadingComponent = ({ isLoading, type = "bar" }) => {
  /**
   * @function
   * @name fadeInAndGrow
   * @memberof module:UI/Common.LoadingComponent
   * @inner
   * @description Animación de keyframe para la aparición y crecimiento del logo.
   * @returns {string} Definición de la animación de keyframe.
   */
  const fadeInAndGrow = keyframes`
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  `;

  /**
   * @function
   * @name moveToCorner
   * @memberof module:UI/Common.LoadingComponent
   * @inner
   * @description Animación de movimiento del logo hacia la esquina.
   * @returns {string} Definición de la animación de keyframe.
   */
  const moveToCorner = keyframes`
    0% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      width: 200px;
      height: 200px;
    }
    100% {
      top: 10px;
      left: 10px;
      transform: translate(0, 0) scale(0.5);
      width: 100px;
      height: 100px;
    }
  `;

  /**
   * @function
   * @name shine
   * @memberof module:UI/Common.LoadingComponent
   * @inner
   * @description Animación de brillo para el logo.
   * @returns {string} Definición de la animación de keyframe.
   */
  const shine = keyframes`
    0% {
      background-position: -200% -200%;
    }
    100% {
      background-position: 200% 200%;
    }
  `;

  if (type === "svg") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#8D5444",
          zIndex: 1000,
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Box
          component="img"
          src={DemoLogo}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "200px",
            height: "200px",
            objectFit: "contain",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            animation: isLoading
              ? `${fadeInAndGrow} 0.5s ease-in-out, ${shine} 3s linear infinite`
              : `${moveToCorner} 0.5s ease-in-out forwards`,
            opacity: 1,
            filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))",
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1000 }}
    >
      <LinearProgress />
    </Box>
  );
};

export default LoadingComponent;