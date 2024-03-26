import Section from "../components/Section";
import AdvancedOptionContent from "../views/AdvancedOptionContent";
import "../assets/styles/main.css";
import PreferencesContent from "../views/PreferencesContent";
import CalendarsContent from "../views/CalendarsContent";
import Navbar from "../components/Navbar";

export default function Home() {
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
          <button className="secondary" id="watch_calendars">
            Ver materias
          </button>
        </div>
      </main>
    </>
  );
}
