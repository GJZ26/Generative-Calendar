const cellColors = [
  "#ffc9e3",
  "#ffbcbc",
  "#d9c8ff",
  "#b8d4ff",
  "#c6ffdd",
  "#b0fbff",
  "#ffedc6",
  "#fff8d8",
  "#ffdab2",
  "#ffcccc",
];

export default function renderTableContent(data, is_dinamic) {
  const column = [];
  let currentIndexColor = 0;
  let map_color = {};

  const dataOrderedByHour = {};

  data.map((ass) => {
    ass.hours.map((hour) => {
      if (!map_color[ass.id]) {
        map_color[ass.id] = cellColors[currentIndexColor];
        if (++currentIndexColor > 9) {
          currentIndexColor = 0;
        }
      }

      dataOrderedByHour[hour] = {
        name: ass.name,
        teacher: ass.teacher,
        id: ass.id,
        quarter: ass.quarter,
        group: ass.group,
      };
    });
  });

  let currentHour = 8;

  for (let i = 1; i <= 9; i++) {
    let row = [];

    row.push(
      <td
        key={i + "_TD"}
        className="time-col"
      >{`${currentHour}:00 - ${++currentHour}:00`}</td>
    );

    for (let j = 0; j < 5; j++) {
      const rowCount = i + j * 9;

      if (dataOrderedByHour[rowCount]) {
        row.push(
          <td
            key={rowCount}
            className="al"
            style={{
              backgroundColor: map_color[dataOrderedByHour[rowCount]["id"]],
            }}
          >
            {is_dinamic ? (
              <span className="grade">
                {dataOrderedByHour[rowCount]["quarter"]}°
                {dataOrderedByHour[rowCount]["group"]}
              </span>
            ) : (
              <></>
            )}
            <span>{dataOrderedByHour[rowCount]["name"]}</span>
            <span className="teacher-name">
              {dataOrderedByHour[rowCount]["teacher"]}
            </span>
          </td>
        );
      } else {
        row.push(
          <td
            key={rowCount}
            className={is_dinamic ? "" : "re"}
            style={
              data.length > 0
                ? undefined
                : {
                    animationDelay: `${(i + j) * 90}ms`,
                    backgroundColor:
                      cellColors[
                        randomIntFromInterval(0, cellColors.length - 1)
                      ],
                  }
            }
          ></td>
        );
      }
    }

    column.push(<tr key={i + "_TR"}>{row}</tr>);
  }

  return column;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
