import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/MUITheme";
import { Provider } from "react-redux";
import store from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ruLocale from "dayjs/locale/ru";
import dayjs from 'dayjs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

dayjs.locale("ru");

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ruLocale.name}>
          <App />
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);