import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Connect } from './Components/Connect';
import { Login } from './Components/Login';
import { store } from './Reducer';
import Router from './Router';
import 'moment/locale/ru';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import license from './utils/crack';
import { SnackbarProvider } from 'notistack';
import ErrorHandler from './Components/ErrorHandler';
import { tz } from 'moment-timezone';
import { HealthProvider } from '@tools/health-status-react-component';
import server from './utils/server';
import ThemeProvider from './Providers/ThemeProvider';
license();
tz.setDefault('GMT');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const url = server();
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LocalizationProvider adapterLocale={'ru'} dateAdapter={AdapterMoment}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <ErrorHandler />
            <Connect>
              <HealthProvider url={url} bottom={40}>
                <Login>
                  <Router />
                </Login>
              </HealthProvider>
            </Connect>
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
