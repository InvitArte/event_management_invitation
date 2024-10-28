/**
 * @module Context/BackgroundImageContext
 * @description Módulo que proporciona un contexto para gestionar imágenes de fondo en diferentes componentes de la aplicación.
 */
// React y hooks
import { createContext, useState, useContext } from "react";

/**
 * @typedef {Object} BackgroundImages
 * @property {string|null} frontPage - URL de la imagen de fondo para la página principal.
 * @property {string|null} countdown - URL de la imagen de fondo para el componente de cuenta regresiva.
 * @property {string|null} eventDetails - URL de la imagen de fondo para los detalles del evento.
 * @property {string|null} collaboration - URL de la imagen de fondo para el componente de colaboración.
 */
// creamos el contexto
const BackgroundImageContext = createContext();

/**
 * @function
 * @name BackgroundImageProvider
 * @memberof module:Context/BackgroundImageContext
 * @category Context
 * @description Componente proveedor del contexto BackgroundImage.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {React.Element} Un elemento React que provee el contexto BackgroundImage.
 *
 * @example
 * <BackgroundImageProvider>
 *   <App />
 * </BackgroundImageProvider>
 */
export const BackgroundImageProvider = ({ children }) => {
  const [backgroundImages, setBackgroundImages] = useState({
    frontPage: null,
    countdown: null,
    eventDetails: null,
    collaboration: null,
  });

  /**
   * @function
   * @name setBackgroundImage
   * @memberof module:Context/BackgroundImageContext
   * @category Context
   * @description Actualiza la imagen de fondo para un componente específico.
   * @param {string} component - El nombre del componente cuya imagen de fondo se actualizará.
   * @param {string} src - La URL de la nueva imagen de fondo.
   */
  const setBackgroundImage = (component, src) => {
    setBackgroundImages((prevState) => ({
      ...prevState,
      [component]: src,
    }));
  };

  return (
    <BackgroundImageContext.Provider
      value={{ backgroundImages, setBackgroundImage }}
    >
      {children}
    </BackgroundImageContext.Provider>
  );
};

/**
 * @function useBackgroundImage
 * @memberof module:Context/BackgroundImageContext
 * @category Context
 * @description Hook personalizado para acceder al contexto BackgroundImage.
 *
 * @returns {Object} Un objeto con las imágenes de fondo y la función para actualizarlas.
 * @returns {BackgroundImages} backgroundImages - Las imágenes de fondo actuales.
 * @returns {function} setBackgroundImage - Función para actualizar una imagen de fondo específica.
 *
 * @example
 * const { backgroundImages, setBackgroundImage } = useBackgroundImage();
 * setBackgroundImage('frontPage', 'url/to/image.jpg');
 */
export const useBackgroundImage = () => useContext(BackgroundImageContext);
