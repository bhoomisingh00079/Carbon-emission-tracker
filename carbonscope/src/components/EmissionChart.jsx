import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmissionChart({ emissions }) {
  const data = {
    labels: ["Transport", "Electricity", "Food"],
    datasets: [
      {
        data: [
          emissions.transport,
          emissions.electricity,
          emissions.food
        ],
        backgroundColor: ["#2563eb", "#16a34a", "#dc2626"]
      }
    ]
  };

  return <Pie data={data} />;
}

export default EmissionChart;
