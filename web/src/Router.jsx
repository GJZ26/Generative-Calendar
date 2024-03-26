import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AsignatureProvider } from "./context/AsignaturesContext";

export default function Router() {
  return (
    <>
      <AsignatureProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AsignatureProvider>
    </>
  );
}
