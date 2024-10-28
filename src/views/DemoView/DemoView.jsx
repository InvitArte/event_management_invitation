/**
 * @module UI/Demo
 * @description Este módulo contiene componentes relacionados con la vista de demostración pública de eventos.
 */

// React
import React, { useMemo } from "react";

// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";

// hooks y servicios
import { useDemoView } from "../../hooks";

// Componentes genéricos
import { LoadingComponent,Footer } from "../../components";

// Componentes propios
import { DemoHeader, DemoEventCard, ConfirmationModal } from "./DemoViewComponents";

// Assets y estilos
import Prueba from "../../assets/imgs/prueba_amapolas.png";
import MobileBackground from "../../assets/imgs/mobile_fondo.png";

/**
 * @constant
 * @name STYLES
 * @type {Object}
 * @memberof module:UI/Demo
 * @description Estilos para los diferentes elementos de la vista de demostración.
 */
const STYLES = {
  container: (isMobile) => ({
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  }),
  background: (isMobile) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${isMobile ? MobileBackground : Prueba})`,
    backgroundSize: isMobile ? "120%" : "cover",
    backgroundPosition: isMobile ? "center top" : "center center",
    backgroundRepeat: "no-repeat",
    transform: isMobile ? "none" : "scale(1)",
    transition: "transform 0.3s ease-out",
    zIndex: -1,
  }),
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: (isMobile) => ({
    width: "100%",
    padding: isMobile ? "20px" : "40px",
    boxSizing: "border-box",
  }),
  content: (isMobile) => ({
    flexGrow: 1,
    display: "flex",
    alignItems: "flex-start",
    py: isMobile ? 3 : 2,
    px: isMobile ? 2 : 4,
    mt: isMobile ? 2 : 4,
  }),
};

/**
 * @component
 * @name DemoView
 * @memberof module:UI/Demo
 * @category Views
 * @description Componente principal para la vista pública. Muestra información del evento y maneja la interacción del usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string|number} props.userId - El ID del usuario para cargar la información del evento.
 *
 * @returns {React.Element} Un elemento React que representa la vista pública.
 *
 * @example
 * <DemoView userId="12345" />
 */
const DemoView = ({ userId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    isLoading,
    eventData,
    error,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    menus,
    allergies
  } = useDemoView(userId);

  /**
   * @constant
   * @name memoizedEventCard
   * @memberof module:UI/Demo.DemoView
   * @inner
   * @type {React.Element|null}
   * @description Memoriza el componente DemoEventCard para evitar re-renderizados innecesarios.
   */
  const memoizedEventCard = useMemo(() => {
    if (!eventData) return null;
    return (
      <DemoEventCard
        userId={userId}
        showTitle={false}
        eventDate={eventData.eventDate}
        eventDateString={eventData.eventDateString}
        eventLocations={eventData.eventLocations}
        onOpenModal={handleOpenModal}
        useCardStyles={false}
      />
    );
  }, [userId, eventData, handleOpenModal]);

  if (!userId) {
    console.error("DemoView: userId es indefinido o nulo");
    return <div>Error: No se pudo cargar la información del usuario.</div>;
  }

  /**
   * @function
   * @name renderContent
   * @description Renderiza el contenido principal de la vista basado en el estado actual.
   * @memberof module:UI/Demo.DemoView
   * @inner
   * @returns {React.Element|null} El contenido renderizado o null si no hay datos del evento.
   */
  const renderContent = () => {
    if (error) {
      return (
        <Box sx={{ color: "error.main", textAlign: "center", p: 2 }}>
          {error}
        </Box>
      );
    }

    return memoizedEventCard;
  };

  return (
    <Box sx={STYLES.container(isMobile)}>
      <Box sx={STYLES.background(isMobile)} />
      <Box sx={STYLES.contentWrapper}>
        <LoadingComponent isLoading={isLoading} type="svg" />
        <Box sx={STYLES.headerContainer(isMobile)}>
          <DemoHeader onOpenModal={handleOpenModal} />
        </Box>
        <Box sx={STYLES.content(isMobile)}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={userId}
          menus={menus}
          allergies={allergies}
        />
        {/* <Footer /> Hay que hacer el footer*/}
      </Box>
    </Box>
  );
};

DemoView.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DemoView;