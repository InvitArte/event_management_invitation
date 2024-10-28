// useConfirmationModal.js
import { useState, useCallback, useEffect } from 'react';
import publicServices from '../../services/publicAxiosConfig';

const fieldNames = {
  'guest.first_name': 'nombre',
  'guest.last_name': 'apellido',
  'guest.email': 'correo electrónico',
  'guest.phone': 'teléfono',
  'guest.allergies': 'alergeno ',
  'guest.observations': 'observaciones',
  'guest.accommodation_plan': 'plan de alojamiento',
  'plus_one.first_name': 'nombre del acompañante',
  'plus_one.last_name': 'apellidos del acompañante',
  'plus_one.allergies': 'alergeno ',
};

const useConfirmationModal = ({ isOpen, userId }) => {
  const [formData, setFormData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData(null);
        setIsSubmitted(false);
        setIsFormValid(false);
        setFormErrors({});
        setIsSubmitting(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleFormChange = useCallback((data) => {
    setFormData(data);
  }, []);

  const handleValidationChange = useCallback((isValid) => {
    setIsFormValid(isValid);
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData) return false;

    const validateField = (section, field, message) => {
      if (!formData[section][field]) {
        errors[`${section}.${field}`] = message;
      }
    };

    validateField("guest", "first_name", "El nombre es requerido");
    validateField("guest", "last_name", "El apellido es requerido");
    validateField("guest", "phone", "El teléfono es requerido");
    validateField("guest", "email", "El email es requerido");
    validateField("guest", "menu_id", "El menú es requerido");

    if (formData.hasPlusOne === "yes") {
      validateField("plus_one", "first_name", "El nombre del acompañante es requerido");
      validateField("plus_one", "last_name", "El apellido del acompañante es requerido");
      validateField("plus_one", "menu_id", "El menú del acompañante es requerido");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const extractFieldFromMessage = useCallback((message) => {
    const match = message.match(/in (guest\.[a-z_]+|plus_one\.[a-z_]+)/i);
    return match ? match[1] : null;
  }, []);

  const translateSecurityError = useCallback((message, field) => {
    const extractedField = extractFieldFromMessage(message);
    const actualField = extractedField || field;
    const fieldName = fieldNames[actualField] || actualField.split('.').pop();

    if (message.includes("Invalid content detected")) {
      return `El ${fieldName} contiene caracteres especiales no permitidos`;
    }

    if (message.includes("Security validation failed")) {
      return `El ${fieldName} contiene contenido que podría ser inseguro`;
    }

    if (actualField.includes('email') && message.includes("validateEmail")) {
      return `El formato del correo electrónico no es válido`;
    }

    if (actualField.includes('phone') && message.includes("validatePhone")) {
      return `El formato del teléfono no es válido`;
    }

    return `Por favor, revisa el contenido introducido en ${fieldName}`;
  }, [extractFieldFromMessage]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm() || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const guestData = {
      ...formData.guest,
      user_id: userId,
    };
    const plusOneData = formData.hasPlusOne === "yes" ? formData.plus_one : null;

    try {
      await publicServices.createGuestWithPlusOne(guestData, plusOneData);
      setIsSubmitted(true);
      setFormErrors({});
    } catch (error) {
      console.error("Error al crear el invitado:", error);
      if (error.response?.status === 422) {
        const errorData = error.response.data.error || {};

        if (errorData.general) {
          const generalMessage = Array.isArray(errorData.general)
            ? errorData.general[0]
            : errorData.general;

          const extractedField = extractFieldFromMessage(generalMessage);
          setFormErrors({
            submit: translateSecurityError(generalMessage, extractedField || 'general')
          });
          return;
        }

        const newErrors = {};
        Object.entries(errorData).forEach(([field, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : messages;

          if (field.startsWith('guest.') || field.startsWith('plus_one.')) {
            newErrors[field] = translateSecurityError(message, field);
          } else {
            const fullField = `guest.${field}`;
            newErrors[fullField] = translateSecurityError(message, fullField);
          }
        });

        if (Object.keys(newErrors).length > 0) {
          setFormErrors({
            ...newErrors,
            submit: "Por favor, revisa los campos marcados y asegúrate de no usar caracteres especiales."
          });
        }
      } else if (error.response?.status === 404) {
        setFormErrors({
          submit: "No se encontró algún recurso necesario. Por favor, actualiza la página e inténtalo de nuevo."
        });
      } else {
        setFormErrors({
          submit: "Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo más tarde."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, userId, validateForm, isSubmitting, extractFieldFromMessage, translateSecurityError]);

  return {
    formData,
    isSubmitted,
    isFormValid,
    formErrors,
    isSubmitting,
    handleFormChange,
    handleValidationChange,
    handleSubmit
  };
};

export default useConfirmationModal;