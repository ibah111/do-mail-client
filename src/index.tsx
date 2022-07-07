import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Connect } from "./Components/Connect";
import { Login } from "./Components/Login";
import { store } from "./Reducer";
import Router from "./Router";
import "moment/locale/ru";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import theme from "./lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import license from "./utils/crack";
license();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider adapterLocale={"ru"} dateAdapter={AdapterMoment}>
        <Provider store={store}>
          <Connect>
            <Login>
              <Router />
            </Login>
          </Connect>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
