import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Historial de progreso (Sin colisiones, preservando mejor y peor)",
    },
  },
  animation: {
      duration: 0
  },
  maintainAspectRatio: true,
};

const options_2 = {
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historial de progreso (Con colisiones, no preservando mejor y peor)",
      },
    },
    animation: {
        duration: 0
    },
    maintainAspectRatio: true,
  };

export default function AditionalData({ data }) {
  const best_legal = [];
  const avarage_legal = [];
  const worst_legal = [];
  const best_ilegal = [];
  const avarage_ilegal = [];
  const worst_ilegal = [];

  for (let log in data["stats"]) {
    best_legal.push(data["stats"][log]["best_legal"]);
    avarage_legal.push(data["stats"][log]["avarage_legal"]);
    worst_legal.push(data["stats"][log]["worst_legal"]);

    best_ilegal.push(data["stats"][log]["best_ilegal"]);
    avarage_ilegal.push(data["stats"][log]["avarage_ilegal"]);
    worst_ilegal.push(data["stats"][log]["worst_ilegal"]);
  }

  const labels = Array.from({ length: data["stats"].length -1}, (_, i) => i + 1);
  const data_1 = {
    labels,
    datasets: [
      {
        label: "Mejor Caso",
        data: best_legal,
        borderColor: "rgb(59, 238, 143)",
        backgroundColor: "rgba(20, 231, 1, 0.5)",
      },
      {
        label: "Promedio",
        data: avarage_legal,
        borderColor: "rgb(172, 176, 248)",
        backgroundColor: "rgba(104, 161, 98, 0.5)",
      },
      {
        label: "Peor Caso",
        data: worst_legal,
        borderColor: "rgb(238, 59, 59)",
        backgroundColor: "rgba(231, 127, 1, 0.5)",
      },
    ],
  };
  const data_2 = {
    labels,
    datasets: [
      {
        label: "Mejor Caso",
        data: best_ilegal,
        borderColor: "rgb(59, 238, 143)",
        backgroundColor: "rgba(20, 231, 1, 0.5)",
      },
      {
        label: "Promedio",
        data: avarage_ilegal,
        borderColor: "rgb(172, 176, 248)",
        backgroundColor: "rgba(104, 161, 98, 0.5)",
      },
      {
        label: "Peor Caso",
        data: worst_ilegal,
        borderColor: "rgb(238, 59, 59)",
        backgroundColor: "rgba(231, 127, 1, 0.5)",
      },
    ],
  };
  return (
    <>
      <div className="more">
        <span>
          <strong>Valor</strong>: {data.general.weight}
        </span>
        <span>
          <strong>Semilla</strong>: {data.general.seed}
        </span>
        <span>
          <strong>Base Aritmética(semilla)</strong>: {data.general.seed_base + 1}
        </span>
        <span>
          <strong>Longitud de semilla</strong>: {data.general.seed_size}
        </span>
      </div>
      <Line options={options} data={data_1} width={1200} height={500} />
      <Line options={options_2} data={data_2} width={1200} height={500} />
    </>
  );
}
