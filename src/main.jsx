// React
import React from "react";
import ReactDOM from "react-dom/client";

// Importaciones importantes
import App from "./App.jsx";

// Estilos
import "./styles/index.css";

// Aseguramos que el elemento root tenga el ID correcto
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No se encontró el elemento root en el DOM");
}

/**
 * Punto de entrada principal de la aplicación React.
 * Renderiza el componente App en el elemento raíz del DOM y activa el modo estricto de React.
 */
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);