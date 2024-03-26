import Calendar from "../components/Calendar";
import CalendarContainer from "../layouts/CalendarContainer";
import { useAsignature } from "../context/AsignaturesContext";

export default function CalendarsContent() {
  const { asignature, setAsignature } = useAsignature();

  return (
    <CalendarContainer>
      {asignature.map((quarter, index) => {
        return (
          <Calendar
            key={index}
            title={"Cuatrimestre " + (index + 1)}
            data={quarter}
            quater={index}
          />
        );
      })}
    </CalendarContainer>
  );
}
