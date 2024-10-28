import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoadingComponent } from "./components";
import { DemoView, NotFoundView } from "./views";
import { usePublicUserConfig } from "./context";

/**
 * @component
 * @name AppContent
 * @description Componente principal que maneja el enrutamiento y la carga inicial de la aplicación pública
 */
const AppContent = () => {
  const { userConfig, isLoading: isConfigLoading } = usePublicUserConfig();
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Maneja la carga inicial
  useEffect(() => {
    if (!isConfigLoading && userConfig) {
      setIsInitialLoad(false);
    }
  }, [isConfigLoading, userConfig]);

  if (isInitialLoad) {
    return <LoadingComponent isLoading={true} type="bar" />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DemoView
            key={JSON.stringify(userConfig)}
            userId={userConfig?.userId}
            userConfig={userConfig}
          />
        }
      />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default AppContent;