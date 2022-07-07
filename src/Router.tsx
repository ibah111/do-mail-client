import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu";
const Main = React.lazy(() => import("./Pages/Main"));
const Incoming = React.lazy(() => import("./Pages/Incoming"));
export default function Router() {
  return (
    <BrowserRouter basename="/apps/mail">
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>Загрузка...</>}>
              <Main />
            </React.Suspense>
          }
        />
        <Route
          path="/incoming"
          element={
            <React.Suspense fallback={<>Загрузка...</>}>
              <Incoming />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
