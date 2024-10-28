/**
 * @module Contexts/PublicUserConfig
 * @description Versión simplificada del contexto de configuración para la web pública
 */
import React, { createContext, useState, useContext, useEffect } from "react";
import { defaultConfig } from "../../config";

const PublicUserConfigContext = createContext();

/**
 * @component
 * @name PublicUserConfigProvider
 * @description Proveedor de configuración simplificado para la web pública
 */
export const PublicUserConfigProvider = ({ children }) => {
  const [userConfig, setUserConfig] = useState(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializa la configuración con los valores por defecto
  useEffect(() => {
    const initConfig = () => {
      try {
        // Podríamos obtener algunos valores de la URL si es necesario
        const urlParams = new URLSearchParams(window.location.search);
        const urlUserId = urlParams.get('userId');

        setUserConfig({
          ...defaultConfig,
          userId: urlUserId || defaultConfig.userId,
        });
      } catch (error) {
        console.error("Error al inicializar la configuración:", error);
        setUserConfig(defaultConfig);
      }
    };

    initConfig();
  }, []);

  /**
   * En la versión pública, updateUserConfig solo actualiza el estado local
   */
  const updateUserConfig = async (newConfig) => {
    try {
      setIsLoading(true);
      setUserConfig(prevConfig => ({
        ...prevConfig,
        ...newConfig
      }));
    } catch (error) {
      console.error("Error actualizando la configuración:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refetchUserConfig = () => {
    // En la versión pública, esto simplemente reinicia al valor por defecto
    setUserConfig(defaultConfig);
  };

  return (
    <PublicUserConfigContext.Provider
      value={{
        userConfig,
        updateUserConfig,
        isLoading,
        refetchUserConfig
      }}
    >
      {children}
    </PublicUserConfigContext.Provider>
  );
};

/**
 * @function
 * @name usePublicUserConfig
 * @description Hook para acceder a la configuración pública
 */
export const usePublicUserConfig = () => {
  const context = useContext(PublicUserConfigContext);
  if (!context) {
    throw new Error("usePublicUserConfig debe ser usado dentro de un PublicUserConfigProvider");
  }
  return context;
};