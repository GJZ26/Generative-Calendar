import Section from "../components/Section";
import AdvancedOptionContent from "../views/AdvancedOptionContent";
import "../assets/styles/main.css";
import PreferencesContent from "../views/PreferencesContent";
import CalendarsContent from "../views/CalendarsContent";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main>
        <Section
          title="Seleccione su estado actual"
          children={<CalendarsContent />}
        />

        <Section title="Preferencias" children={<PreferencesContent />} />

        <Section
          title="Opciones Avanzadas"
          children={<AdvancedOptionContent />}
        />

        <div className="button-container">
          <button className="main">Generar horario</button>
          <button
            className="secondary"
            id="watch_calendars"
            onClick={() => {
              navigate("/schedules");
              scrollTo(0,0)
            }}
          >
            Ver materias
          </button>
        </div>
      </main>
    </>
  );
}
