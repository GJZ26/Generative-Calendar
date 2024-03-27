import renderTableContent from '../utils/ScheduleUtils.jsx'

export default function Schedule({ data }) {
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
      <tbody>{renderTableContent(data.assignatures)}</tbody>
    </table>
  );
}
