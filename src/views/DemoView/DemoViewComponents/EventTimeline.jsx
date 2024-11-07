// React
import React from "react";
// Bibliotecas de terceros
import PropTypes from "prop-types";

// Material-UI
import { Box, Container, Typography, useTheme } from "@mui/material";
import { DirectionsBus as DirectionsBusIcon, Church as ChurchIcon, Restaurant as RestaurantIcon } from "@mui/icons-material";

// Componentes propios
import TimelineItem from "./TimelineItem";

/**
 * @component EventTimeline
 * @description Componente que muestra una línea de tiempo del evento con elementos que se activan según el progreso del scroll.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {number} props.scrollProgress - El progreso del scroll (0-100).
 * @param {Array} props.eventLocations - Array de objetos con información de las ubicaciones del evento.
 *
 * @returns {React.Element} Un elemento React que representa la línea de tiempo del evento.
 *
 * @example
 * // Ejemplo de uso del componente
 * <EventTimeline
 *   scrollProgress={50}
 *   eventLocations={[
 *     { direccion: "Iglesia San José, Calle Principal 123", latitud: 40.712776, longitud: -74.005974 },
 *     { direccion: "Salón de Fiestas, Avenida Central 456", latitud: 40.712775, longitud: -74.005973 }
 *   ]}
 * />
 */
const EventTimeline = ({ scrollProgress, eventLocations }) => {

  /**
   * @constant {Object} theme
   * @description Accede al tema actual de la aplicación.
   */
  const theme = useTheme();

  /**
   * @constant
   * @description Array de objetos que representan los elementos de la línea de tiempo.
   */
  const timelineItems = [
    {
      icon: <DirectionsBusIcon />,
      time: "11:15",
      description: "Salida autobuses",
      isExpandable: false,
    },
    {
      icon: <ChurchIcon />,
      time: "12:00",
      description: "Tu ceremonia",
      isExpandable: true,
      locations: [eventLocations[0]],
    },
    {
      icon: <RestaurantIcon />,
      time: "14:00",
      description: "Tu celebración",
      isExpandable: true,
      locations: [eventLocations[1]],
    },
    {
      icon: <DirectionsBusIcon />,
      time: "02:00",
      description: "Regreso autobuses",
      isExpandable: false,
    },
  ];

  const totalItems = timelineItems.length;
  const itemActivationDuration = 100 / totalItems;

  return (
    <Container maxWidth="md" sx={{ background: 'transparent' }}>
      <Box sx={{ my: 4, background: 'transparent' }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            mb: 4,
            color: "#8D5444",
            fontFamily: "'Elegant_font', regular ",
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Cronograma del Evento
        </Typography>
        <Box sx={{ mb: 4, background: 'transparent' }}>
          {timelineItems.map((item, index) => {
            const itemStartProgress = index * itemActivationDuration;
            const itemEndProgress = (index + 1) * itemActivationDuration;

            let itemProgress;
            if (scrollProgress <= itemStartProgress) {
              itemProgress = 0;
            } else if (scrollProgress >= itemEndProgress) {
              itemProgress = 100;
            } else {
              itemProgress = ((scrollProgress - itemStartProgress) / itemActivationDuration) * 100;
            }

            return (
              <TimelineItem
                key={index}
                icon={item.icon}
                time={item.time}
                description={item.description}
                fillPercentage={itemProgress}
                isLast={index === timelineItems.length - 1}
                locations={item.locations}
                isExpandable={item.isExpandable}
              />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

EventTimeline.propTypes = {
  scrollProgress: PropTypes.number.isRequired,
  eventLocations: PropTypes.arrayOf(
    PropTypes.shape({
      direccion: PropTypes.string,
      latitud: PropTypes.number,
      longitud: PropTypes.number,
    })
  ).isRequired,
};

export default EventTimeline;