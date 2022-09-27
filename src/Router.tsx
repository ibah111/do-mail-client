import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader';
import Menu from './Components/Menu';
import Remove from './Pages/Remove';
const Main = React.lazy(() => import('./Pages/Main'));
const Incoming = React.lazy(() => import('./Pages/Incoming'));
const Admin = React.lazy(() => import('./Pages/Admin'));
export default function Router() {
  return (
    <BrowserRouter basename="/apps/mail">
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense
              fallback={
                <>
                  <Loader />
                </>
              }
            >
              <Main />
            </React.Suspense>
          }
        />
        <Route
          path="/incoming"
          element={
            <React.Suspense
              fallback={
                <>
                  <Loader />
                </>
              }
            >
              <Incoming />
            </React.Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <React.Suspense
              fallback={
                <>
                  <Loader />
                </>
              }
            >
              <Admin />
            </React.Suspense>
          }
        />
        <Route
          path="/remove"
          element={
            <React.Suspense
              fallback={
                <>
                  <Loader />
                </>
              }
            >
              <Remove />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
