import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function EmissionTrendChart({ history }) {
  const data = {
    labels: history.map((item) => item.date),
    datasets: [
      {
        label: "Daily Emissions (kg CO₂)",
        data: history.map((item) => item.total),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.3
      }
    ]
  };

  return <Line data={data} />;
}

export default EmissionTrendChart;
