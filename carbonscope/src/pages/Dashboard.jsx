import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import EmissionChart from "../components/EmissionChart";

function Dashboard() {
  const { emissions } = useContext(ActivityContext);

  if (!emissions) {
    return (
      <div style={emptyState}>
        <h2>Dashboard</h2>
        <p>No activity data yet.</p>
        <p style={{ color: "#6b7280" }}>
          Please add today’s activity to see your carbon footprint.
        </p>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2>Dashboard</h2>
      <p style={subtitle}>
        Overview of your <strong>today’s carbon footprint</strong>
      </p>

      {/* Chart Card */}
      <div style={card}>
        <EmissionChart emissions={emissions} />
      </div>

      {/* Summary Card */}
      <div style={card}>
        <h3 style={sectionTitle}>Emission Breakdown</h3>
        <ul style={list}>
          <li style={listItem}>
            Transport: <strong>{emissions.transport.toFixed(2)} kg CO₂</strong>
          </li>
          <li style={listItem}>
            Electricity:{" "}
            <strong>{emissions.electricity.toFixed(2)} kg CO₂</strong>
          </li>
          <li style={listItem}>
            Food: <strong>{emissions.food.toFixed(2)} kg CO₂</strong>
          </li>
          <li style={totalItem}>
            Total: <strong>{emissions.total.toFixed(2)} kg CO₂</strong>
          </li>
        </ul>
      </div>

      {/* Action Row */}
      <div style={actions}>
        <button
          onClick={() => window.location.reload()}
          style={resetButton}
        >
          New Day / Reset
        </button>

        <p style={impactText}>
          Potential reduction if recommendations are followed:{" "}
          <strong>{(emissions.total * 0.25).toFixed(2)} kg CO₂</strong>
        </p>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  maxWidth: "900px",
  margin: "32px auto",
  padding: "0 16px"
};

const subtitle = {
  marginBottom: "20px",
  color: "#6b7280"
};

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  marginBottom: "24px"
};

const sectionTitle = {
  marginBottom: "12px"
};

const list = {
  listStyle: "none",
  padding: 0,
  margin: 0
};

const listItem = {
  marginBottom: "8px",
  color: "#374151"
};

const totalItem = {
  marginTop: "12px",
  fontSize: "16px"
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px"
};

const resetButton = {
  padding: "8px 14px",
  border: "1px solid #d1d5db",
  background: "#ffffff",
  borderRadius: "6px",
  cursor: "pointer"
};

const impactText = {
  color: "#6b7280",
  fontSize: "14px"
};

const emptyState = {
  maxWidth: "600px",
  margin: "60px auto",
  textAlign: "center"
};

export default Dashboard;