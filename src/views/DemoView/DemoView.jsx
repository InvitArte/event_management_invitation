import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { useDemoView } from "../../hooks";
import { LoadingComponent } from "../../components";
import { DemoHeader, DemoEventCard, ConfirmationModal, CalendarButton } from "./DemoViewComponents";
import MyH_Fondo_recto from "../../assets/imgs/MyH_Fondo_recto.jpg";

const STYLES = {
  container: (isMobile) => ({
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#2F4F4F",
    margin: 0,
    padding: 0,
    overflow: "auto", // Permitir scroll
  }),
  background: (isMobile) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#2F4F4F",
    backgroundImage: !isMobile ? `url(${MyH_Fondo_recto})` : `url(${MyH_Fondo_recto})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    margin: 0,
    padding: 0,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: !isMobile ? "rgba(255, 255, 255, 0.5)" : "transparent",
    }
  }),
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 2,
    height: "100vh",
    '& > div': {
      boxShadow: "2px 26px 13px -8px rgba(0,0,0,0.5)"
    },
    marginBottom: "-20px", // Pequeño ajuste para eliminar el espacio
  },
  calendarWrapper: {
    position: 'relative',
    zIndex: 1,
    marginTop: "-3px", // Pequeño ajuste para eliminar el espacio
    backgroundColor: "#2F4F4F",
    minHeight: "100vh", // Asegurar que tiene altura suficiente
    display: 'flex',
    flexDirection: 'column'
  },
  contentWrapperInner: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
  }
};



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
        <Box sx={STYLES.contentWrapperInner}>
          <Box sx={STYLES.headerWrapper}>
            <DemoHeader onOpenModal={handleOpenModal} />
          </Box>
          <Box sx={STYLES.calendarWrapper}>
            <CalendarButton eventLocations={eventData?.eventLocations} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

DemoView.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DemoView;