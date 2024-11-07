import React, { useCallback, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, useMediaQuery, useTheme, Typography, styled } from "@mui/material";
import { IS_DEMO } from "../../../config/api/BaseUrl";
import { formatDateForCalendar } from "../../../components";
import {
  TimeUnit,
  TimeValue,
  TimeLabel,
  ElegantButton,
} from "./ConfirmationModalStyles";
import floralSeparator from "../../../assets/imgs/FloralSeparator.svg";

const CountdownContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  width: "100%",
  padding: "0 10px",
});

const Divider = styled('span')({
  color: "#656565",
  fontSize: "1.5rem",
  fontWeight: "300",
  opacity: 0.5,
  alignSelf: "flex-start",
  marginTop: "12px",
  padding: "0 2px",
});

const CompactTimeUnit = styled(TimeUnit)({
  padding: "0",
  minWidth: "auto",
  "& > *": {
    lineHeight: 1,
  }
});

const FloralImage = styled('img')({
  width: '60px',
  height: 'auto',
  marginTop: '20px',
});

const getRoundContainerStyles = (isMobile) => ({
  padding: isMobile ? "20px" : "30px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(0.5px)",
  borderRadius: "50%",
  width: isMobile ? "280px" : "320px",
  height: isMobile ? "280px" : "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.3)"
});

const CompactTimeValue = styled(TimeValue)({
  fontSize: "2rem !important",
  lineHeight: "1 !important",
  padding: "0 !important",
  margin: "0 !important",
});

const CompactTimeLabel = styled(TimeLabel)({
  fontSize: "0.8rem !important",
  lineHeight: "1 !important",
  marginTop: "4px !important",
});

const CalendarButton = React.memo(({ eventLocations }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fixedEventDate = useMemo(() => new Date('2025-10-18T12:00:00'), []);

  const { displayDate } = useMemo(() => {
    const now = new Date();
    if (IS_DEMO && fixedEventDate < now) {
      const newDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 4);
      return { displayDate: newDate };
    }
    return { displayDate: fixedEventDate };
  }, [fixedEventDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(displayDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(displayDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [displayDate]);

  const addToGoogleCalendar = useCallback(() => {
    if (!displayDate) return;
    const startDate = formatDateForCalendar(displayDate);
    const endDate = formatDateForCalendar(new Date(displayDate.getTime() + 2 * 60 * 60 * 1000));
    const locationString = eventLocations.map((location) => location.direccion).join(", ");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Boda de María y Thibault"
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      "Detalles del evento"
    )}&location=${encodeURIComponent(locationString || "Ubicación del evento")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [displayDate, eventLocations]);

  if (!displayDate) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box sx={getRoundContainerStyles(isMobile)}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Elegant_font', bold",
            fontSize: isMobile ? "1.9rem" : "1.5rem",
            color: "#2F4F4F",
            mb: 2,
            // textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}
        >
          Faltan
        </Typography>
        <CountdownDisplay timeLeft={timeLeft} isMobile={isMobile} />
        <FloralImage src={floralSeparator} alt="Separador floral" />
      </Box>

      <Box
        mt={{
          xs: 40,
          md: 10
        }}
      >
        <ElegantButton inverted="true" onClick={addToGoogleCalendar}>
          Save the date
        </ElegantButton>
      </Box>
    </Box>
  );
});

const CountdownDisplay = React.memo(({ timeLeft, isMobile }) => {
  if (!timeLeft || Object.keys(timeLeft).length === 0) {
    return (
      <Typography sx={{ color: 'inherit', fontFamily: "'CormorantUpright', regular" }}>
        ¡El gran día ha llegado!
      </Typography>
    );
  }

  const displayUnits = ['dias', 'horas', 'minutos', 'segundos'];

  return (
    <CountdownContainer>
      {displayUnits.map((unit, index) => (
        <React.Fragment key={unit}>
          {timeLeft[unit] !== undefined && (
            <>
              <CompactTimeUnit>
                <CompactTimeValue>
                  {String(timeLeft[unit]).padStart(2, '0')}
                </CompactTimeValue>
                <CompactTimeLabel>
                  {unit}
                </CompactTimeLabel>
              </CompactTimeUnit>
              {index < displayUnits.length - 1 && <Divider>|</Divider>}
            </>
          )}
        </React.Fragment>
      ))}
    </CountdownContainer>
  );
});

const calculateTimeLeft = (displayDate) => {
  if (!displayDate) return null;
  const now = new Date();
  const difference = displayDate.getTime() - now.getTime();

  if (difference <= 0) return {};

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60)
  };
};

CalendarButton.propTypes = {
  eventLocations: PropTypes.arrayOf(
    PropTypes.shape({
      direccion: PropTypes.string,
    })
  ).isRequired,
};

export default CalendarButton;