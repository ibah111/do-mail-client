import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import { ruRU as ruRUGrid } from "@mui/x-data-grid-premium";
const theme = createTheme({}, ruRU, ruRUGrid);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
