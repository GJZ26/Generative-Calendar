import renderTableContent from "../utils/ScheduleUtils.jsx";

export default function Schedule({ data, isDinamic = false }) {
  if (!isDinamic) {
    return (
      <table border={1} cellSpacing={0}>
        <thead>
          <tr>
            <th>{`${data.quarter}°${data.group}`}</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>{renderTableContent(data.assignatures, isDinamic)}</tbody>
      </table>
    );
  }

  return (
    <table
      border={1}
      cellSpacing={0}
      className={data.length > 0 ? "" : "holding"}
    >
      <thead>
        <tr>
          <th></th>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miércoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
        </tr>
      </thead>
      <tbody>{renderTableContent(data, isDinamic)}</tbody>
    </table>
  );
}
