import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./Pages";

export default function Router() {
  return (
    <BrowserRouter basename="/apps/mail">
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
