/**
 *  @module UI/Demo
 *  @desc Componente que muestra un botón para añadir un evento al calendario de Google y una cuenta regresiva hasta la fecha del evento.
 */

// React y hooks
import React, { useCallback, useEffect, useState, useMemo } from "react";

// Biblioteca de terceros
import PropTypes from "prop-types";

// Material-UI
import { Box, useMediaQuery, useTheme } from "@mui/material";

// Servicios y configuración
import { IS_DEMO } from "../../../config/api/BaseUrl";

// Componentes genéricos
import { formatDateForCalendar, formatDateToString } from "../../../components";

// Assets y estilos
import {
  TimeUnit,
  TimeValue,
  TimeLabel,
  EventDateTypography,
  ElegantButton,
} from "./ConfirmationModalStyles";

/**
 * @component
 * @name CalendarButton
 * @memberof module:UI/Demo
 * @category UI
 * @description Componente que muestra un botón para añadir un evento al calendario de Google y una cuenta regresiva hasta la fecha del evento.
 * Este componente está envuelto en React.memo para evitar re-renderizados innecesarios.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Date} props.eventDate - La fecha del evento.
 * @param {string} props.eventDateString - La fecha del evento en formato de cadena.
 * @param {Array} props.eventLocations - Array de objetos con las ubicaciones del evento.
 *
 * @returns {React.Element} Un elemento React que representa el botón de calendario y la cuenta regresiva.
 *
 * @example
 * // Ejemplo de uso del componente
 * <CalendarButton
 *   eventDate={new Date('2024-12-31')}
 *   eventDateString="31 de Diciembre, 2024"
 *   eventLocations={[{ direccion: "Calle Principal 123" }]}
 * />
 */
const CalendarButton = React.memo(({ eventDate, eventDateString, eventLocations }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * @constant
   * @name displayDateInfo
   * @memberof module:UI/Demo.CalendarButton
   * @inner
   * @type {Object}
   * @description Calcula y memoriza la fecha de visualización y su representación en cadena.
   */
  const { displayDate, displayDateString } = useMemo(() => {
    const now = new Date();
    if (IS_DEMO && eventDate < now) {
      const newDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + 4);
      return { displayDate: newDate, displayDateString: formatDateToString(newDate) };
    }
    return { displayDate: eventDate, displayDateString: eventDateString };
  }, [eventDate, eventDateString]);

  /**
   * @state
   * @name timeLeft
   * @memberof module:UI/Demo.CalendarButton
   * @inner
   * @type {Object}
   * @description Estado que almacena el tiempo restante hasta el evento.
   */
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(displayDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(displayDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [displayDate]);

  /**
   * @function
   * @name addToGoogleCalendar
   * @memberof module:UI/Demo.CalendarButton
   * @inner
   * @description Abre una nueva ventana para añadir el evento al calendario de Google.
   */
  const addToGoogleCalendar = useCallback(() => {
    if (!displayDate) return;
    const startDate = formatDateForCalendar(displayDate);
    const endDate = formatDateForCalendar(new Date(displayDate.getTime() + 2 * 60 * 60 * 1000));
    const locationString = eventLocations.map((location) => location.direccion).join(", ");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Tu celebración"
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
      sx={{
        background: 'transparent',
        color: theme.palette.text.primary,
      }}
    >
      <EventDateTypography sx={{
        color: 'inherit',
        mb: 2,
        fontSize: isMobile ? "1.2rem" : "1.7rem"
      }}>
        {displayDateString}
      </EventDateTypography>
      <CountdownDisplay timeLeft={timeLeft} isMobile={isMobile} theme={theme} />
      <Box mt={2}>
        <ElegantButton inverted="true" onClick={addToGoogleCalendar}>
          Save the date
        </ElegantButton>
      </Box>
    </Box>
  );
});

/**
 * @component
 * @name CountdownDisplay
 * @memberof module:UI/Demo.CalendarButton
 * @inner
 * @description Componente que muestra la cuenta regresiva. Está envuelto en React.memo para evitar re-renderizados innecesarios.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.timeLeft - Objeto con el tiempo restante.
 * @param {boolean} props.isMobile - Indica si se está en vista móvil.
 * @param {Object} props.theme - Objeto de tema de Material-UI.
 * @returns {React.Element} Un elemento React que representa la cuenta regresiva.
 */
const CountdownDisplay = React.memo(({ timeLeft, isMobile, theme }) => {
  if (timeLeft && Object.keys(timeLeft).length > 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={isMobile ? 0.5 : 1}
        mb={3}
        flexWrap="nowrap"
        sx={{
          fontSize: isMobile ? '0.8rem' : '1rem',
          '& > *': { flexShrink: 0 }
        }}
      >
        {Object.entries(timeLeft).map(([interval, value]) => {
          if (value > 0) {
            const label = value === 1 ? singularLabels[interval] : interval;
            return (
              <TimeUnit key={interval} sx={{ padding: isMobile ? '4px' : '8px', background: 'transparent' }}>
                <TimeValue sx={{ fontSize: isMobile ? '2.10rem' : '2.8rem', color: 'inherit' }}>{value}</TimeValue>
                <TimeLabel sx={{ fontSize: isMobile ? '1rem' : '1.8rem', color: 'inherit' }}>{label}</TimeLabel>
              </TimeUnit>
            );
          }
          return null;
        })}
      </Box>
    );
  } else {
    return <EventDateTypography sx={{ color: 'inherit' }}>¡El gran día ha llegado!</EventDateTypography>;
  }
});

/**
 * @function
 * @name calculateTimeLeft
 * @memberof module:UI/Demo.CalendarButton
 * @inner
 * @description Calcula el tiempo restante hasta la fecha del evento.
 * @param {Date} displayDate - La fecha del evento.
 * @returns {Object|null} Un objeto con el tiempo restante o null si la fecha no está definida.
 */
const calculateTimeLeft = (displayDate) => {
  if (!displayDate) return null;
  const now = new Date();
  const difference = displayDate.getTime() - now.getTime();

  if (difference <= 0) return {};

  const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
  const daysInMilliseconds = difference - (months * 30.44 * 24 * 60 * 60 * 1000);
  const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { meses: months, días: days, horas: hours, minutos: minutes, segundos: seconds };
};

/**
 * @constant
 * @name singularLabels
 * @memberof module:UI/Demo.CalendarButton
 * @inner
 * @type {Object}
 * @description Objeto que contiene las etiquetas en singular para cada unidad de tiempo.
 */
const singularLabels = {
  meses: 'mes',
  días: 'día',
  horas: 'hora',
  minutos: 'minuto',
  segundos: 'segundo'
};

CalendarButton.propTypes = {
  eventDate: PropTypes.instanceOf(Date),
  eventDateString: PropTypes.string.isRequired,
  eventLocations: PropTypes.arrayOf(
    PropTypes.shape({
      direccion: PropTypes.string,
    })
  ).isRequired,
};

export default CalendarButton;