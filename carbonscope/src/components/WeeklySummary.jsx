import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function WeeklySummary() {
  const { history } = useContext(ActivityContext);

  if (!history || history.length === 0) {
    return null;
  }

  // Take last 7 entries
  const last7Days = history.slice(-7);

  const total = last7Days.reduce((sum, d) => sum + d.total, 0);
  const avg = total / last7Days.length;

  const bestDay = last7Days.reduce((min, d) =>
    d.total < min.total ? d : min
  );

  const worstDay = last7Days.reduce((max, d) =>
    d.total > max.total ? d : max
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Weekly Summary (Last 7 Entries)
      </h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex justify-between">
          <span>Total Emissions</span>
          <span className="font-medium">
            {total.toFixed(2)} kg CO₂
          </span>
        </li>

        <li className="flex justify-between">
          <span>Average per Entry</span>
          <span className="font-medium">
            {avg.toFixed(2)} kg CO₂
          </span>
        </li>

        <li className="flex justify-between">
          <span>Best Entry</span>
          <span className="text-green-600 font-medium">
            {new Date(bestDay.timestamp || bestDay.date).toLocaleString()
} (
            {bestDay.total.toFixed(2)} kg)
          </span>
        </li>

        <li className="flex justify-between">
          <span>Worst Entry</span>
          <span className="text-red-600 font-medium">
            {new Date(worstDay.timestamp || worstDay.date).toLocaleString()
} (
            {worstDay.total.toFixed(2)} kg)
          </span>
        </li>
      </ul>
    </div>
  );
}

export default WeeklySummary;
