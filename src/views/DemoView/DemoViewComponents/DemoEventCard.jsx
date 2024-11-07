import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import {
  CalendarButton,
  ConfirmationModal,
  GiftMessage,
  EventTimeline,
  ConfirmButton,
  EventTitleStyle,
  EventSubtitle,
  EventInfo
} from './index';
import FloralSeparator from "../../../assets/imgs/FloralSeparator.svg";


const DemoEventCard = ({
  userId,
  showTitle,
  eventDate,
  eventDateString,
  eventLocations,
  useCardStyles = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const cardRef = useRef(null);
  const timelineRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const viewportBottom = windowHeight;

        if (timelineTop < viewportBottom) {
          const visibleHeight = Math.min(viewportBottom - timelineTop, timelineHeight);
          const progress = (visibleHeight / timelineHeight) * 100;
          setTimelineProgress(Math.min(100, Math.max(0, progress)));
        } else {
          setTimelineProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!eventDate || !eventLocations) {
    return null;
  }

  const getCardStyles = (isMobile) => ({
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxShadow: "none",
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
    left: "50%",
    transform: "translateX(-50%)",
    "&::before": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: isMobile ? `url(${Ejemplo})` : 'none',
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      opacity: isMobile ? 1 : 0,
      zIndex: 0
    },
    "&::after": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isMobile ? "rgba(255, 255, 255, 0.5)" : "transparent",
      backdropFilter: isMobile ? "blur(0px)" : "none",
      zIndex: 1
    }
  });

  const getContentStyles = () => ({
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: { xs: 2, sm: 3, md: 4 },
    zIndex: 2,
    backgroundColor: "transparent"
  });

  const FloralSeparatorComponent = () => (
    <Box
      component="img"
      src={FloralSeparator}
      alt="Separador Floral"
      sx={{
        width: "40px",
        height: "auto",
        display: "block",
        margin: "16px auto",
        opacity: 0.7,
      }}
    />
  );

  const renderTitle = () => {
    if (!showTitle) return null;
    return (
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <EventSubtitle variant="h2" sx={{ mb: 2 }}>¡Nos casamos!</EventSubtitle>
        <EventTitleStyle variant="h1">Maria & Thibault</EventTitleStyle>
      </Box>
    );
  };

  const renderEventInfo = () => (
    <EventInfo sx={{ width: '100%', maxWidth: 'sm', mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <CalendarButton
          eventDate={eventDate}
          eventDateString={eventDateString}
          eventLocations={eventLocations}
        />
      </Box>
    </EventInfo>
  );

  const renderEventTimeline = () => (
    <EventInfo
      ref={timelineRef}
      sx={{
        width: '100%',
        maxWidth: 'md',
        my: 4,
        minHeight: { xs: '40vh', sm: '50vh', md: '60vh' }
      }}
    >
      <EventTimeline
        scrollProgress={timelineProgress}
        eventLocations={eventLocations}
      />
    </EventInfo>
  );

  const renderGiftMessage = () => (
    <Box sx={{ width: '100%', maxWidth: 'sm', my: 4 }}>
      <GiftMessage accountNumber="DE01 2345 6789 0123 4567 8901" />
    </Box>
  );

  const renderConfirmButton = () => (
    <Box sx={{
      width: '100%',
      maxWidth: 'sm',
      display: 'flex',
      justifyContent: 'center',
      mt: 4
    }}>
      <ConfirmButton
        onClick={handleOpenModal}
        fullWidth={isMobile}
        sx={{
          maxWidth: isMobile ? '100%' : '300px'
        }}
      />
    </Box>
  );

  return (
    <Box sx={getCardStyles(isMobile)}>
      <Box sx={getContentStyles()}>
        {renderTitle()}
        {renderEventInfo()}
        <FloralSeparatorComponent />
        {renderEventTimeline()}
        <FloralSeparatorComponent />
        {renderGiftMessage()}
        <FloralSeparatorComponent />
        {renderConfirmButton()}
      </Box>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
      />
    </Box>
  );
};

DemoEventCard.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showTitle: PropTypes.bool.isRequired,
  eventDate: PropTypes.instanceOf(Date),
  eventDateString: PropTypes.string,
  eventLocations: PropTypes.array,
  useCardStyles: PropTypes.bool,
};

export default DemoEventCard;