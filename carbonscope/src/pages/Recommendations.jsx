import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function Recommendations() {
  const { emissions } = useContext(ActivityContext);

  if (!emissions) {
    return <p>Add your daily activity to get personalized tips.</p>;
  }

  const tips = [];

  // Transport-based tips
  if (emissions.transport > 5) {
    tips.push({
      title: "Reduce Transport Emissions",
      description:
        "Use public transport, carpool, or switch to walking/cycling for short distances.",
      impact: "Can reduce up to 30% of transport emissions"
    });
  }

  // Electricity-based tips
  if (emissions.electricity > 7) {
    tips.push({
      title: "Lower Electricity Usage",
      description:
        "Switch to LED bulbs, unplug unused devices, and use energy-efficient appliances.",
      impact: "Save 15–25% electricity emissions"
    });
  }

  // Food-based tips
  if (emissions.food > 2) {
    tips.push({
      title: "Adopt a Low-Carbon Diet",
      description:
        "Reducing non-vegetarian meals can significantly lower your carbon footprint.",
      impact: "Up to 50% reduction in food-related emissions"
    });
  }

  return (
    <div>
      <h2>Recommended Actions</h2>
      <p style={{ color: "#6b7280" }}>
        Based on your activity data, here are steps you can take:
      </p>

      {tips.length === 0 ? (
        <p>Great job! Your emissions are already low 🎉</p>
      ) : (
        <ul>
          {tips.map((tip, index) => (
            <li key={index} style={{ marginBottom: "16px" }}>
              <strong>{tip.title}</strong>
              <p>{tip.description}</p>
              <em>{tip.impact}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
