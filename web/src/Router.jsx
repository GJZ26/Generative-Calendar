import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AsignatureProvider } from "./context/AsignaturesContext";
import ViewSchedules from "./pages/ViewSchedules";

export default function Router() {
  return (
    <>
      <AsignatureProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedules" element={<ViewSchedules />} />
          </Routes>
        </BrowserRouter>
      </AsignatureProvider>
    </>
  );
}
