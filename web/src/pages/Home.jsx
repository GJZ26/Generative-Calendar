import Section from "../components/Section";
import AdvancedOptionContent from "../views/AdvancedOptionContent";
import "../assets/styles/main.css";
import PreferencesContent from "../views/PreferencesContent";
import CalendarsContent from "../views/CalendarsContent";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../context/PreferencesContext";

export default function Home() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = usePreferences();

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
          <button
            className="main"
            onClick={() => {
              preferences["actioned"] = true;
              setPreferences(preferences);
              navigate("/result");
              scrollTo(0, 0);
            }}
          >
            Generar horario
          </button>
          <button
            className="secondary"
            onClick={() => {
              navigate("/schedules");
              scrollTo(0, 0);
            }}
          >
            Ver materias
          </button>
        </div>
      </main>
    </>
  );
}
