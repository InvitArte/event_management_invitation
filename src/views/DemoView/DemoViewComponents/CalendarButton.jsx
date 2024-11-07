import React, { useCallback, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, useMediaQuery, useTheme, Typography, styled } from "@mui/material";
import { IS_DEMO } from "../../../config/api/BaseUrl";
import { formatDateForCalendar } from "../../../components";
import { ElegantButton } from "./ConfirmationModalStyles";
import Tapiz from "../../../assets/imgs/tapiz.jpeg";

const BackgroundContainer = styled(Box)(() => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: 0,
  padding: 0,
  backgroundColor: "#2F4F4F",
  backgroundImage: `url(${Tapiz})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    zIndex: 0,
  }
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  margin: 0,
  padding: 0
});

const CountdownContainer = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  width: "100%",
  padding: "0 10px",
  marginBottom: "2rem",
  [theme.breakpoints.up('sm')]: {
    gap: "4px",
    padding: "0 20px",
    marginBottom: "3rem",
  }
}));

const TimeUnit = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up('sm')]: {
    minWidth: "120px",
  }
}));

const TimeValue = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  lineHeight: 1,
  color: "#2F4F4F",
  fontFamily: "'Elegant_font', bold",
  [theme.breakpoints.up('sm')]: {
    fontSize: "3.5rem",
  }
}));

const TimeLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  lineHeight: 1,
  marginTop: "4px",
  color: "#656565",
  [theme.breakpoints.up('sm')]: {
    fontSize: "1.2rem",
    marginTop: "8px",
  }
}));

const Divider = styled('span')(({ theme }) => ({
  color: "#656565",
  fontSize: "1.5rem",
  fontWeight: "300",
  opacity: 0.5,
  alignSelf: "flex-start",
  marginTop: "12px",
  padding: "0 2px",
  [theme.breakpoints.up('sm')]: {
    fontSize: "2rem",
    marginTop: "16px",
    padding: "0 8px",
  }
}));

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
    const locationString = eventLocations?.map((location) => location.direccion).join(", ");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Boda de María y Thibault"
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      "Detalles del evento"
    )}&location=${encodeURIComponent(locationString || "Ubicación del evento")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [displayDate, eventLocations]);

  if (!displayDate) return null;

  return (
    <BackgroundContainer>
      <ContentWrapper>
        <Typography
          sx={{
            fontFamily: "'Elegant_font', bold",
            fontSize: isMobile ? "4.4rem" : "7rem",
            color: "#2F4F4F",
          }}
        >
          Nos Casamos
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Elegant_font', bold",
            fontSize: isMobile ? "1.9rem" : "2.5rem",
            color: "#2F4F4F",
            mb: isMobile ? 2 : 4,
            letterSpacing: "0.1em"
          }}
        >
          Faltan
        </Typography>
        <CountdownDisplay timeLeft={timeLeft} isMobile={isMobile} />
        <ElegantButton
          inverted="true"
          onClick={addToGoogleCalendar}
          sx={{
            fontSize: isMobile ? "1rem" : "1.4rem",
            padding: isMobile ? "8px 16px" : "12px 24px",
          }}
        >
          Save the date
        </ElegantButton>
      </ContentWrapper>
    </BackgroundContainer>
  );
});

const CountdownDisplay = React.memo(({ timeLeft, isMobile }) => {
  if (!timeLeft || Object.keys(timeLeft).length === 0) {
    return (
      <Typography sx={{
        color: 'inherit',
        fontFamily: "'CormorantUpright', regular",
        fontSize: isMobile ? "1.5rem" : "2.5rem"
      }}>
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
              <TimeUnit>
                <TimeValue>
                  {String(timeLeft[unit]).padStart(2, '0')}
                </TimeValue>
                <TimeLabel>
                  {unit}
                </TimeLabel>
              </TimeUnit>
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

CountdownDisplay.propTypes = {
  timeLeft: PropTypes.shape({
    dias: PropTypes.number,
    horas: PropTypes.number,
    minutos: PropTypes.number,
    segundos: PropTypes.number
  }),
  isMobile: PropTypes.bool
};

CalendarButton.propTypes = {
  eventLocations: PropTypes.arrayOf(
    PropTypes.shape({
      direccion: PropTypes.string,
    })
  ),
};

export default CalendarButton;