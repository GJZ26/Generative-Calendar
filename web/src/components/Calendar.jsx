import { useAsignature } from "../context/AsignaturesContext";

export default function Calendar({ title, data, quater }) {
  const { asignature, setAsignature } = useAsignature();

  seriationVerifier(asignature, setAsignature);

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

function clickHandler(e, quarter, action, asignaturesTemporal, setAsignatures) {
  e.preventDefault();

  const target = e.target;
  const asignatures = JSON.parse(JSON.stringify(asignaturesTemporal));

  if (!target.role) {
    throw new Error("This DOM element is not valid for select.");
  }

  if (target.role === "header") {
    let are_all_same_typo = true;

    asignatures[quarter].map((current_subject) => {
      are_all_same_typo =
        are_all_same_typo && action === current_subject.status;
      current_subject.status = action;
      current_subject.has_changed = true;
    });

    if (are_all_same_typo) {
      asignatures[quarter].map((current_subject) => {
        current_subject.status = "not-cursed";
        current_subject.has_changed = true;
      });
    }
  }

  if (target.role === "assignature") {
    const [subID, subIndex] = target.id.split("_");

    if (asignatures[quarter][subIndex].status === action) {
      asignatures[quarter][subIndex].status = "not-cursed";
      asignatures[quarter][subIndex].has_changed = true;
    } else {
      asignatures[quarter][subIndex].status = action;
      asignatures[quarter][subIndex].has_changed = true;
    }
  }

  seriationVerifier(asignatures, setAsignatures, asignaturesTemporal);
}

function seriationVerifier(asignatures, setAsignatures) {
  const failed = new Set();
  const not_cursed = new Set();
  const approved = new Set();
  const available = new Set();
  const unavailable = new Set();

  asignatures.map((cuatrimestre, index) => {
    cuatrimestre.map((materia) => {
      if (!materia.has_changed) return;

      if (materia.status === "failed") {
        // SI HA SIDO REPROBADO

        materia.dependencies.forEach((val) => {
          unavailable.add(val);
        });

        materia.dependents.forEach((val) => {
          approved.add(val);
        });

        recursive_mark(
          index,
          false,
          materia.dependencies,
          unavailable,
          asignatures
        );
        recursive_mark(index, true, materia.dependents, approved, asignatures);

        failed.add(materia.id);
      }

      if (materia.status === "not-cursed") {
        // SI NO HA SIDO CURSADO

        materia.dependencies.forEach((val) => {
          unavailable.add(val);
        });

        recursive_mark(
          index,
          false,
          materia.dependencies,
          unavailable,
          asignatures
        );

        available.add(materia.id);
      }

      if (materia.status === "approved") {
        // SI ESTÁ APROBADO

        materia.dependencies.forEach((val) => {
          not_cursed.add(val);
        });
        materia.dependents.forEach((val) => {
          approved.add(val);
        });

        recursive_mark(
          index,
          false,
          materia.dependencies,
          unavailable,
          asignatures
        );
        recursive_mark(index, true, materia.dependents, approved, asignatures);

        approved.add(materia.id);
      }

      materia.has_changed = false;
    });
  });

  asignatures.map((cuatrimestre) => {
    cuatrimestre.map((materia) => {
      const current_id = materia.id;

      if (failed.has(current_id)) {
        materia.status = "failed";
      }

      if (not_cursed.has(current_id)) {
        materia.status = "not-cursed";
      }

      if (approved.has(current_id)) {
        materia.status = "approved";
      }

      if (available.has(current_id)) {
        materia.status = "not-cursed";
      }

      if (unavailable.has(current_id)) {
        materia.status = "unavailable";
      }
    });
  });

  setAsignatures(asignatures);
}

function recursive_mark(cuatrimestre, reverse, items, save_on, subject) {
  const current_cuatri = reverse ? --cuatrimestre : ++cuatrimestre;

  if (cuatrimestre >= subject.length || cuatrimestre <= 0) {
    return;
  }

  if (items.length === 0) {
    return;
  }

  subject[current_cuatri].map((materia) => {
    if (save_on.has(materia.id)) {
      if (reverse) {
        materia.dependents.forEach((ele) => {
          save_on.add(ele);
        });
      } else {
        materia.dependencies.forEach((ele) => {
          save_on.add(ele);
        });
      }
    }
  });

  recursive_mark(current_cuatri, reverse, save_on, save_on, subject);
}
