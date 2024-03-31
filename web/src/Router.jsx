import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AsignatureProvider } from "./context/AsignaturesContext";
import ViewSchedules from "./pages/ViewSchedules";
import ScheduleGenerated from "./pages/ScheduleGenerated";
import { PreferencesProvider } from "./context/PreferencesContext";

export default function Router() {
  return (
    <>
      <PreferencesProvider>
        <AsignatureProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schedules" element={<ViewSchedules />} />
              <Route path="/result" element={<ScheduleGenerated />} />
            </Routes>
          </BrowserRouter>
        </AsignatureProvider>
      </PreferencesProvider>
    </>
  );
}
