import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function Recommendations() {
  const { emissions, history } = useContext(ActivityContext);

  if (!emissions || !history || history.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-gray-400">
          Log activities to unlock personalized recommendations 🌱
        </p>
      </div>
    );
  }

  /* =========================
     📊 CALCULATIONS
     ========================= */

  const avg = history.reduce(
    (acc, cur) => {
      acc.transport += cur.transport || 0;
      acc.electricity += cur.electricity || 0;
      acc.food += cur.food || 0;
      return acc;
    },
    { transport: 0, electricity: 0, food: 0 }
  );

  const count = history.length;
  avg.transport /= count;
  avg.electricity /= count;
  avg.food /= count;

  /* =========================
     🧠 BUILD RECOMMENDATIONS
     ========================= */

  const actions = [];

  if (emissions.transport > avg.transport) {
    actions.push({
      title: "Cut Transport Emissions",
      level: "High",
      reason: "Today’s transport emissions are higher than your average.",
      steps: [
        "Walk or cycle for short distances",
        "Combine trips to reduce total distance",
        "Use public transport when possible",
      ],
      impact: "Save up to 2–4 kg CO₂ per day",
    });
  }

  if (emissions.electricity > avg.electricity) {
    actions.push({
      title: "Optimize Electricity Usage",
      level: "Medium",
      reason: "Electricity usage spiked today compared to past days.",
      steps: [
        "Turn off standby devices",
        "Use natural lighting during daytime",
        "Limit AC usage by 1–2 hours",
      ],
      impact: "Reduce electricity emissions by ~20%",
    });
  }

  if (emissions.food > avg.food) {
    actions.push({
      title: "Improve Food Choices",
      level: "Low",
      reason: "Food emissions were slightly higher today.",
      steps: [
        "Choose plant-based meals once a day",
        "Avoid food wastage",
      ],
      impact: "Up to 50% lower food emissions",
    });
  }

  /* =========================
     🎨 UI
     ========================= */

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Smart Recommendations
        </h2>
        <p className="text-gray-400">
          Based on today’s activity compared to your past behavior
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat label="Transport Today" value={`${emissions.transport.toFixed(2)} kg`} />
        <Stat label="Electricity Today" value={`${emissions.electricity.toFixed(2)} kg`} />
        <Stat label="Food Today" value={`${emissions.food.toFixed(2)} kg`} />
      </div>

      {/* RECOMMENDATIONS */}
      {actions.length === 0 ? (
        <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-6 text-center">
          <p className="text-green-400 font-medium">
            🎉 Excellent! Today is better than your average.
          </p>
          <p className="text-sm text-green-300 mt-1">
            Keep maintaining these habits.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {actions.map((a, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {a.title}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full
                    ${a.level === "High" && "bg-red-600/20 text-red-400"}
                    ${a.level === "Medium" && "bg-yellow-600/20 text-yellow-400"}
                    ${a.level === "Low" && "bg-green-600/20 text-green-400"}
                  `}
                >
                  {a.level} Priority
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-3">
                {a.reason}
              </p>

              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mb-4">
                {a.steps.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>

              <p className="text-sm text-green-400 font-medium">
                🌱 {a.impact}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   🔹 SMALL COMPONENT
   ========================= */
function Stat({ label, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-semibold text-white mt-1">
        {value}
      </p>
    </div>
  );
}

export default Recommendations;
