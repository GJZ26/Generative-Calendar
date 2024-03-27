import Navbar from "../components/Navbar";
import Section from "../components/Section";
import StaticButton from "../components/StaticButton";
import SchedulesContainer from "../layouts/SchedulesContainer";
import ScheduleContent from "../views/ScheduleContent";
import { useNavigate } from "react-router-dom";

export default function ViewSchedules() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main>
        <Section title="2024.12.11.12.00 Horarios Grupos">
          <StaticButton
            text={"Volver"}
            className={"secondary"}
            onClick={() => {
              navigate("/");
              scrollTo(0,0)
            }}
          />
          <SchedulesContainer>
            <ScheduleContent />
          </SchedulesContainer>
        </Section>
      </main>
    </>
  );
}
