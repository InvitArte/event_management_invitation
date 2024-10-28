/**
 * @module UI/Demo/Components
 * @description Modal de confirmación para la inscripción al evento
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { DialogActions, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationForm from "./ConfirmationForm";
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogContent,
  CloseButton,
  SuccessMessage,
  ErrorMessage,
  ElegantButton,
} from "./ConfirmationModalStyles";
import { useConfirmationModal } from "../../../hooks";
import "../../../styles/fonts.css";

/**
 * @component
 * @name ConfirmationModal
 * @description Modal para la confirmación de asistencia al evento
 *
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Controla si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string|number} props.userId - ID del usuario del evento
 * @param {Array} props.menus - Lista de menús disponibles
 * @param {Array} props.allergies - Lista de alergias disponibles
 */
const ConfirmationModal = ({ isOpen, onClose, userId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    formData,
    isSubmitted,
    isFormValid,
    formErrors,
    isSubmitting,
    handleFormChange,
    handleValidationChange,
    handleSubmit
  } = useConfirmationModal({ isOpen, userId });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <CustomDialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      disableScrollLock
      aria-labelledby="confirmation-dialog-title"
    >
      <CloseButton onClick={handleClose} aria-label="cerrar">
        <CloseIcon />
      </CloseButton>

      <CustomDialogTitle id="confirmation-dialog-title">
        {isSubmitted ? "¡Gracias por confirmar!" : "¿Te gustaría acompañarnos?"}
      </CustomDialogTitle>

      <CustomDialogContent>
        {isSubmitted ? (
          <SuccessMessage>¡Nos vemos en la boda!</SuccessMessage>
        ) : (
          <ConfirmationForm
            onFormChange={handleFormChange}
            onValidationChange={handleValidationChange}
            formErrors={formErrors}
          />
        )}
        {formErrors.submit && <ErrorMessage>{formErrors.submit}</ErrorMessage>}
      </CustomDialogContent>

      <DialogActions
        style={{
          justifyContent: "center",
          padding: isMobile ? "16px" : "8px 0",
        }}
      >
        {isSubmitted ? (
          <ElegantButton
            onClick={handleClose}
            fullWidth={isMobile}
            aria-label="cerrar modal"
          >
            Cerrar
          </ElegantButton>
        ) : (
          <ElegantButton
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            aria-label="confirmar asistencia"
            fullWidth={isMobile}
          >
            {isSubmitting ? "Enviando..." : "Confirmar"}
          </ElegantButton>
        )}
      </DialogActions>
    </CustomDialog>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Optimizamos el rendimiento con memo
export default React.memo(ConfirmationModal);