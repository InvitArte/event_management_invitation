import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import publicServices from "../../../services/publicAxiosConfig";
import { defaultConfig } from "../../../config";
import {
  CustomFormControl,
  CustomTextField,
  CustomRadio,
  CustomCheck,
} from "./ConfirmationModalStyles";
import "../../../styles/fonts.css";

const initialFormData = {
  guest: {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    needs_transport: false,
    needs_transport_back: false,
    needs_hotel: false,
    menu_id: "",
    allergies: [], // Ahora es un array de strings
    accommodation_plan: "",
    observations: "",
    honeypot: false,
    validated: false,
  },
  plus_one: {
    first_name: "",
    last_name: "",
    menu_id: "",
    allergies: [], // Ahora es un array de strings
  },
  hasPlusOne: "no",
};

const ConfirmationForm = ({
  onFormChange,
  onValidationChange,
  formErrors,
  initialData = null,
}) => {
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [touchedFields, setTouchedFields] = useState({});
  const [menus, setMenus] = useState([]);
  const [allergies, setAllergies] = useState([]);
  useEffect(() => {
    const loadMenusAndAllergies = async () => {
      try {
        const userId = defaultConfig.userId;
        const [menusData, allergiesData] = await Promise.all([
          publicServices.getMenus(userId),
          publicServices.getAllergies(),
        ]);

        if (Array.isArray(menusData)) {
          setMenus(menusData);
        } else {
          console.error("Unexpected menus data format:", menusData);
          setMenus([]);
        }

        if (Array.isArray(allergiesData)) {
          setAllergies(allergiesData);
        } else {
          console.error("Unexpected allergies data format:", allergiesData);
          setAllergies([]);
        }
      } catch (error) {
        console.error("Error loading menus or allergies:", error);
        setMenus([]);
        setAllergies([]);
      }
    };

    loadMenusAndAllergies();
  }, []);

  useEffect(() => {
    onFormChange(formData);
    const isValid = validateForm(formData);
    onValidationChange(isValid);
  }, [formData, onFormChange, onValidationChange]);

  const validateForm = useCallback((data) => {
    const errors = {};
    const { guest, plus_one, hasPlusOne } = data;

    const validateField = (section, field, message) => {
      if (!data[section][field]) {
        errors[`${section}.${field}`] = message;
      }
    };

    validateField("guest", "first_name", "El nombre es requerido");
    validateField("guest", "last_name", "El apellido es requerido");
    validateField("guest", "phone", "El teléfono es requerido");
    validateField("guest", "email", "El email es requerido");
    validateField("guest", "menu_id", "El menú es requerido");

    if (hasPlusOne === "yes") {
      validateField(
        "plus_one",
        "first_name",
        "El nombre del acompañante es requerido"
      );
      validateField(
        "plus_one",
        "last_name",
        "El apellido del acompañante es requerido"
      );
      validateField(
        "plus_one",
        "menu_id",
        "El menú del acompañante es requerido"
      );
    }

    return Object.keys(errors).length === 0;
  }, []);

  const handleInputChange = useCallback((e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
    setTouchedFields((prev) => ({ ...prev, [`${section}.${name}`]: true }));
  }, []);

  const handlePlusOneChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      hasPlusOne: e.target.value,
    }));
  }, []);

  const handleAllergyChange = useCallback((event, newValue, section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        allergies: newValue, // Ahora newValue es un array de strings
      },
    }));
  }, []);

  const renderTextField = useCallback(
    (field, section) => (
      <Grid item xs={12} key={`${section}-${field.name}`}>
        <CustomTextField
          fullWidth
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[section][field.name]}
          onChange={(e) => handleInputChange(e, section)}
          onBlur={() =>
            setTouchedFields((prev) => ({
              ...prev,
              [`${section}.${field.name}`]: true,
            }))
          }
          required={field.required}
          variant="standard"
          error={!!formErrors[`${section}.${field.name}`]}
          helperText={formErrors[`${section}.${field.name}`]}
          inputProps={{
            autoCapitalize: field.autoCapitalize,
            autoCorrect: "off",
            inputMode: field.inputMode,
          }}
          select={field.type === "select"}
          multiline={field.multiline}
          rows={field.rows}
        >
          {field.type === "select" &&
            field.options &&
            field.options.map((option) => (
              <MenuItem
                key={`${section}-${field.name}-${option}`}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          {field.type === "select" &&
            !field.options &&
            menus.map((menu) => (
              <MenuItem key={`${section}-menu-${menu.id}`} value={menu.id}>
                {menu.name}
              </MenuItem>
            ))}
        </CustomTextField>
      </Grid>
    ),
    [formData, formErrors, handleInputChange, menus]
  );

  const renderCheckbox = useCallback(
    (field, section) => (
      <Grid item xs={12} key={`${section}-${field.name}`}>
        <CustomFormControl>
          <FormControlLabel
            control={
              <CustomCheck
                checked={formData[section][field.name]}
                onChange={(e) => handleInputChange(e, section)}
                name={field.name}
              />
            }
            label={field.label}
          />
        </CustomFormControl>
      </Grid>
    ),
    [formData, handleInputChange]
  );

  const renderAllergySelect = useCallback(
    (section) => {
      return (
        <Grid item xs={12} key={`${section}-allergies`}>
          <Autocomplete
            multiple
            freeSolo
            id={`${section}-allergies-select`}
            options={allergies.map(allergy => allergy.name)}
            value={formData[section].allergies}
            onChange={(event, newValue) =>
              handleAllergyChange(event, newValue, section)
            }
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label={`Seleccione o escriba las alergias ${
                  section === "plus_one" ? "del acompañante" : ""
                }`}
                variant="standard"
                error={!!formErrors[`${section}.allergies`]}
                helperText={formErrors[`${section}.allergies`]}
              />
            )}
          />
        </Grid>
      );
    },
    [formData, formErrors, allergies, handleAllergyChange]
  );

  const guestFields = useMemo(
    () => [
      {
        name: "first_name",
        label: "Nombre",
        type: "text",
        autoCapitalize: "words",
        required: true,
      },
      {
        name: "last_name",
        label: "Apellido",
        type: "text",
        autoCapitalize: "words",
        required: true,
      },
      {
        name: "phone",
        label: "Teléfono",
        type: "tel",
        inputMode: "tel",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        inputMode: "email",
        autoCapitalize: "none",
        required: true,
      },
      {
        name: "menu_id",
        label: "Seleccione el menú",
        type: "select",
        required: true,
      },
      {
        name: "observations",
        label: "Observaciones",
        type: "text",
        multiline: true,
        rows: 4,
        required: false,
      },
    ],
    []
  );

  const guestCheckboxFields = useMemo(
    () => [
      { name: "needs_transport", label: "¿Necesitas autobús de ida?" },
      { name: "needs_transport_back", label: "¿Necesitas autobús de vuelta?" },
      { name: "needs_hotel", label: "¿Necesitas alojamiento?" },
    ],
    []
  );

  const plusOneFields = useMemo(
    () => [
      {
        name: "first_name",
        label: "Nombre del acompañante",
        type: "text",
        autoCapitalize: "words",
        required: true,
      },
      {
        name: "last_name",
        label: "Apellido del acompañante",
        type: "text",
        autoCapitalize: "words",
        required: true,
      },
      {
        name: "menu_id",
        label: "Seleccione el menú del acompañante",
        type: "select",
        required: true,
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      {guestFields.map((field) => renderTextField(field, "guest"))}
      {renderAllergySelect("guest")}
      {renderTextField(
        {
          name: "accommodation_plan",
          label: "Desde donde sales",
          type: "select",
          options: ["Sevilla", "Madrid", "Barcelona", "Valencia", "Bilbao"],
          required: false,
        },
        "guest"
      )}
      {guestCheckboxFields.map((field) => renderCheckbox(field, "guest"))}

      <Grid item xs={12}>
        <CustomFormControl component="fieldset">
          <FormLabel component="legend">¿Vienes acompañado?</FormLabel>
          <RadioGroup
            row
            name="hasPlusOne"
            value={formData.hasPlusOne}
            onChange={handlePlusOneChange}
          >
            <FormControlLabel
              value="yes"
              control={<CustomRadio />}
              label="Sí"
            />
            <FormControlLabel value="no" control={<CustomRadio />} label="No" />
          </RadioGroup>
        </CustomFormControl>
      </Grid>

      {formData.hasPlusOne === "yes" && (
        <>
          {plusOneFields.map((field) => renderTextField(field, "plus_one"))}
          {renderAllergySelect("plus_one")}
        </>
      )}

      {/* HONEYPOT */}
      <Grid item xs={12} sx={{ display: "none" }}>
        <FormControlLabel
          control={
            <CustomCheck
              checked={formData.guest.honeypot}
              onChange={(e) => handleInputChange(e, "guest")}
              name="honeypot"
            />
          }
          label="¿Eres humano?"
        />
      </Grid>
    </Grid>
  );
};

ConfirmationForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  formErrors: PropTypes.object,
  initialData: PropTypes.object,
};

const memoizedConfirmationForm = React.memo(ConfirmationForm);
export default memoizedConfirmationForm;