import schedule_data from "../assets/data/schedules.json";
import Schedule from "../components/Schedule";

export default function ScheduleContent() {
  return (
    <>
      {schedule_data.map((group, index) => {
        return <Schedule key={index} data={group} />;
      })}
    </>
  );
}
