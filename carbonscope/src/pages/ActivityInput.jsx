import { useContext, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";

function ActivityInput() {
  const { saveActivity } = useContext(ActivityContext);
  const [transport, setTransport] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("veg");

  const handleSubmit = (e) => {
    e.preventDefault();

    saveActivity({
      transportKm: Number(transport),
      electricityKwh: Number(electricity),
      foodType: food
    });

    alert("Activity saved for today");
  };

  return (
    <div style={container}>
      <h2>Daily Activity Input</h2>
      <p style={subtitle}>
        Enter your daily activities to calculate today’s carbon footprint
      </p>

      <form onSubmit={handleSubmit} style={form}>
        <label style={label}>Transport (km)</label>
        <input
          type="number"
          placeholder="e.g. 10"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          style={input}
        />

        <label style={label}>Electricity Usage (kWh)</label>
        <input
          type="number"
          placeholder="e.g. 5"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          style={input}
        />

        <label style={label}>Food Preference</label>
        <select
          value={food}
          onChange={(e) => setFood(e.target.value)}
          style={input}
        >
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>

        <button type="submit" style={button}>
          Save Activity
        </button>
      </form>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  maxWidth: "420px",
  margin: "40px auto",
  background: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
};

const subtitle = {
  marginBottom: "20px",
  color: "#6b7280",
  fontSize: "14px"
};

const form = {
  display: "flex",
  flexDirection: "column"
};

const label = {
  fontSize: "14px",
  marginBottom: "6px",
  color: "#374151"
};

const input = {
  padding: "10px",
  marginBottom: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px"
};

const button = {
  padding: "10px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer"
};

export default ActivityInput;
