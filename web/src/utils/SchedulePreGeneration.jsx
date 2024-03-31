import hours_availables from "../assets/data/schedules.json";
import all_asignatures from "../assets/data/subjects.json";

export default function purgeSubject(
  data,
  setClearedSubject,
  preferences,
  navTo
) {
  const result = [];
  const available_assignature = [];

  if (!preferences.actioned) {
    setTimeout(() => {
      navTo("/");
    }, 3000);
    return setClearedSubject(
      "Illegal: You have to choose your progress before proceeding. Redirecting to the main page.."
    );
  }

  data.map((quart) => {
    quart.map((mat) => {
      if (mat.status === "not-cursed" || mat.status === "failed") {
        available_assignature.push(mat.id);
      }
    });
  });

  hours_availables.map((group) => {
    group.assignatures.map((assig) => {
      if (available_assignature.includes(assig.canonical)) {
        const weight = find_weight(group.quarter, assig.canonical);
        result.push({
          id: assig.id,
          canonical: assig.canonical,
          name: assig.name,
          quarter: group.quarter,
          group: group.group,
          teacher: assig.teacher,
          hours: assig.hours,
          weight: weight,
        });
      }
    });
  });

  setClearedSubject(result);
}

function find_weight(quarter, id) {
  for (let i = 0; i < all_asignatures[quarter - 1].length; i++) {
    if (all_asignatures[quarter - 1][i].id === id) {
      return all_asignatures[quarter - 1][i].weight;
    }
  }
  return -1;
}

/**
 * @deprecated
 * @param {string} json_as_string JSON of Assignatures as string
 * @returns Same json with one more field "Weight".
 */
function count_dependencies(json_as_string) {
  const weights = {};

  const data_parsed = JSON.parse(json_as_string);
  for (let i = data_parsed.length - 1; i >= 0; i--) {
    const quarter = data_parsed[i];
    for (let j = 0; j < quarter.length; j++) {
      const assignature = quarter[j];
      const weight = assignature.dependencies.length;
      weights[assignature.id] = weight;
      if (weight > 0) {
        for (let k = 0; k < weight; k++) {
          const key = assignature.dependencies[k];
          weights[assignature.id] = weights[assignature.id] + weights[key];
        }
      }
      data_parsed[i][j].weight = weights[assignature.id];
    }
  }

  return JSON.stringify(data_parsed);
}
