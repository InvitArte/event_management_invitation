/**
 * @module UI/Common
 * @description Este módulo contiene un componente reutilizable para una tarjeta personalizada.
 */

// React
import React from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { shouldForwardProp } from '@mui/system';
import { Box, styled } from "@mui/material";

/**
 * @component
 * @name CustomCard
 * @memberof module:UI/Common
 * @category Containers
 * @description Componente de caja personalizada con estilos de tarjeta opcionales.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} [props.useCardStyles=true] - Determina si se aplican los estilos de tarjeta.
 * @param {React.ReactNode} props.children - Contenido del componente.
 *
 * @returns {React.Element} Una caja estilizada que puede tener apariencia de tarjeta.
 *
 * @example
 * <CustomCard useCardStyles={true}>
 *   <p>Contenido de la tarjeta</p>
 * </CustomCard>
 */
const CustomCard = React.forwardRef(({ children, useCardStyles = true, ...props }, ref) => {
  /**
   * @function
   * @name StyledBox
   * @inner
   * @description Componente Box estilizado con Material-UI styled.
   * @param {Object} theme - El tema de Material-UI.
   * @param {boolean} useCardStyles - Determina si se aplican los estilos de tarjeta.
   * @returns {React.Component} Componente Box estilizado.
   */
  const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'useCardStyles' && shouldForwardProp(prop),
  })(({ theme, useCardStyles }) => ({
    ...(useCardStyles && {
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      "&:hover": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    }),
  }));

  return (
    <StyledBox ref={ref} useCardStyles={useCardStyles} {...props}>
      {children}
    </StyledBox>
  );
});

CustomCard.displayName = "CustomCard";

CustomCard.propTypes = {
  children: PropTypes.node,
  useCardStyles: PropTypes.bool,
};

export default CustomCard;