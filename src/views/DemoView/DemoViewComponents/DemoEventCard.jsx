/**
 *  @module UI/Demo
 *  @description Este módulo contiene componentes relacionados con la vista de demostración pública de eventos.
*/
// React y hooks
import React, { useState, useEffect, useCallback, useRef } from "react";

// Biblioteca de terceros
import PropTypes from "prop-types";

// Material-UI
import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";

// Componentes genéricos
import { CustomCard } from "../../../components";

// Componentes propios
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

// Assets y estilos
import FloralSeparator from "../../../assets/imgs/FloralSeparator.svg";

/**
 * @component
 * @name DemoEventCard
 * @memberof module:UI/Demo
 * @category UI
 * @description Componente que muestra la información detallada de un evento de boda, incluyendo fecha, ubicaciones, timeline y opciones de confirmación.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string|number} props.userId - El ID del usuario.
 * @param {boolean} props.showTitle - Indica si se debe mostrar el título del evento.
 * @param {Date} props.eventDate - La fecha del evento.
 * @param {string} props.eventDateString - La fecha del evento en formato de cadena.
 * @param {Array} props.eventLocations - Array de objetos con las ubicaciones del evento.
 * @param {boolean} [props.useCardStyles=true] - Indica si se deben aplicar estilos de tarjeta al componente.
 *
 * @returns {React.Element} Un elemento React que representa la tarjeta de evento de boda.
 *
 * @example
 * // Ejemplo de uso del componente
 * <DemoEventCard
 *   userId="12345"
 *   showTitle={true}
 *   eventDate={new Date('2024-12-31')}
 *   eventDateString="31 de Diciembre, 2024"
 *   eventLocations={[{ direccion: "Iglesia San José", hora: "16:00" }]}
 *   useCardStyles={true}
 * />
 */
const DemoEventCard = ({
  userId,
  showTitle,
  eventDate,
  eventDateString,
  eventLocations,
  useCardStyles = true,
}) => {

  /**
   * @state {boolean} isModalOpen
   * @description Estado que indica si el modal de confirmación está abierto.
   * @default false
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * @state {number} timelineProgress
   * @description Estado que indica el progreso del timeline en porcentaje.
   * @default 0
   */
  const [timelineProgress, setTimelineProgress] = useState(0);

  /**
   * @constant {Object} cardRef
   * @description Referencia al elemento de la tarjeta.
   * @default null
   */
  const cardRef = useRef(null);

  /**
   * @constant {Object} timelineRef
   * @description Referencia al elemento del timeline.
   * @default null
   */
  const timelineRef = useRef(null);

  /**
   * @constant {Object} theme
   * @description Accede al tema actual de la aplicación.
   */
  const theme = useTheme();

  /**
   * @constant {boolean} isMobile
   * @description Indica si la vista es móvil.
   */
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    /**
     * @function
     * @name handleScroll
     * @memberof module:UI/Demo.DemoEventCard
     * @inner
     * @description Maneja el evento de scroll para actualizar el progreso del timeline.
     */
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

  /**
   * @function
   * @name handleOpenModal
   * @memberof module:UI/Demo.DemoEventCard
   * @inner
   * @description Abre el modal de confirmación.
   */
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  /**
   * @function
   * @name handleCloseModal
   * @memberof module:UI/Demo.DemoEventCard
   * @inner
   * @description Cierra el modal de confirmación.
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!eventDate || !eventLocations) {
    return null;
  }

  /**
   * @function
   * @name FloralSeparatorComponent
   * @memberof module:UI/Demo.DemoEventCard
   * @inner
   * @description Renderiza un separador floral.
   * @returns {React.Element} Un elemento React que representa el separador floral.
   */
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

  /**
   * @function
   * @name renderTitle
   * @memberof module:UI/Demo.DemoEventCard
   * @inner
   * @description Renderiza el título del evento si showTitle es true.
   * @returns {React.Element|null} Un elemento React que representa el título del evento o null.
   */
  const renderTitle = () => {
    if (!showTitle) return null;
    return (
      <>
        <EventSubtitle variant="h2">¡Nos casamos!</EventSubtitle>
        <EventTitleStyle variant="h1">Maria  &  Thibault</EventTitleStyle>
      </>
    );
  };

  /**
   * @function
   * @name renderEventInfo
   * @memberof module:UI/Demo.DemoEventCard
   * @inner
   * @description Renderiza la información del evento, incluyendo la fecha y el botón de calendario.
   * @returns {React.Element} Un elemento React que representa la información del evento.
   */
  const renderEventInfo = () => (
    <EventInfo>
      <Box display="flex" flexDirection="column" gap={2}>
        <CalendarButton
          eventDate={eventDate}
          eventDateString={eventDateString}
          eventLocations={eventLocations}
        />
      </Box>
    </EventInfo>
  );

  /**
   * @function
   * @name renderEventTimeline
   * @memberof module:UI/Demo.DemoEventCardK
   * @inner
   * @description Renderiza el timeline del evento.
   * @returns {React.Element} Un elemento React que representa el timeline del evento.
   */
  const renderEventTimeline = () => (
    <EventInfo ref={timelineRef} sx={{ my: 8, minHeight: "60vh" }}>
      <EventTimeline
        scrollProgress={timelineProgress}
        eventLocations={eventLocations}
      />
    </EventInfo>
  );

  return (
    <CustomCard ref={cardRef} useCardStyles={useCardStyles}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box sx={{ padding: useCardStyles ? 2 : 0 }}>
          {renderTitle()}
          {renderEventInfo()}
          {/* <FloralSeparatorComponent />
          {renderEventTimeline()}
          <FloralSeparatorComponent /> */}
          {/* <GiftMessage accountNumber="DE01 2345 6789 0123 4567 8901" /> */}
          {/* <FloralSeparatorComponent /> */}
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ConfirmButton onClick={handleOpenModal} fullWidth={isMobile} />
          </Box> */}
        </Box>
      </Box>
      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
      /> */}
    </CustomCard>
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