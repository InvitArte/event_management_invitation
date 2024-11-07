import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { useDemoView } from "../../hooks";
import { LoadingComponent } from "../../components";
import { DemoHeader, DemoEventCard, ConfirmationModal } from "./DemoViewComponents";
import M_H_fondo from "../../assets/imgs/M_H_fondo.jpeg";

const STYLES = {
  container: (isMobile) => ({
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#2F4F4F"
  }),
  background: (isMobile) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&::before': {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${M_H_fondo})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: isMobile ? "cover" : "contain",
      opacity: 0.8,
      zIndex: -1,
      height: '100%',
      width: '100%'
    }
  }),
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "transparent"
  },
  headerContainer: (isMobile) => ({
    width: "100%",
    padding: isMobile ? "20px" : "40px",
    boxSizing: "border-box",
    flexShrink: 0
  }),
  content: (isMobile) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: isMobile ? 3 : 2,
    px: isMobile ? 2 : 4,
    boxSizing: "border-box",
    minHeight: 0
  }),
  gridContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  gridItem: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
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
        <Box sx={STYLES.headerContainer(isMobile)}>
          <DemoHeader onOpenModal={handleOpenModal} />
        </Box>
        <Box sx={STYLES.content(isMobile)}>
          <Grid container sx={STYLES.gridContainer} justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6} sx={STYLES.gridItem}>
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
      </Box>
    </Box>
  );
};

DemoView.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DemoView;