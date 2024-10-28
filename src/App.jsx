import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import AppContent from "./AppContent";
import { BackgroundImageProvider, PublicUserConfigProvider } from "./context";

import "react-toastify/dist/ReactToastify.css";
import "dayjs/locale/es";

dayjs.locale('es');

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <BackgroundImageProvider>
        <PublicUserConfigProvider>
          <Router>
            <AppContent />
          </Router>
        </PublicUserConfigProvider>
      </BackgroundImageProvider>
    </LocalizationProvider>
  );
};

export default App;