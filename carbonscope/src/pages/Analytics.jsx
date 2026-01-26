import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import EmissionTrendChart from "../components/EmissionTrendChart";

function Analytics() {
  const { history } = useContext(ActivityContext);

  return (
    <div>
      <h1>Analytics</h1>

      {!history || history.length === 0 ? (
        <p>No history yet. Add activity data to see trends.</p>
      ) : (
        <>
          <EmissionTrendChart history={history} />

          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.date} — {item.total.toFixed(2)} kg CO₂
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Analytics;