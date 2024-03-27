import { useAsignature } from "../context/AsignaturesContext";
import clickHandler from "../utils/CalendarUtils";

export default function Calendar({ title, data, quater }) {
  const { asignature, setAsignature } = useAsignature();

  return (
    <div
      className="calendar"
      onClick={(e) =>
        clickHandler(e, quater, "approved", asignature, setAsignature)
      }
      onContextMenu={(e) =>
        clickHandler(e, quater, "failed", asignature, setAsignature)
      }
    >
      <span className="title" role="header">
        {title}
      </span>

      <div className="asignatures">
        {data.map((asignature, index) => {
          return (
            <span
              id={`${asignature.id}_${index}`}
              name={asignature.name}
              className={
                asignature.status === "not-cursed" ? "" : asignature.status
              }
              role="assignature"
              key={index}
            >
              {asignature.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
