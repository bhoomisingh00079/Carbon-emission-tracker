import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function GoalCard() {
  const { emissions, goal } = useContext(ActivityContext);

  if (!emissions) return null;

  const percent = Math.min(
    Math.round((emissions.total / goal) * 100),
    100
  );

  const over = emissions.total > goal;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-medium mb-2">Daily Goal</h3>

      <p className="text-sm text-gray-500 mb-3">
        Goal: <strong>{goal} kg CO₂</strong>
      </p>

      <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
        <div
          className={`h-3 rounded-full ${
            over ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm">
        {emissions.total.toFixed(2)} kg used ({percent}%)
      </p>

      <p
        className={`text-sm mt-2 ${
          over ? "text-red-600" : "text-green-600"
        }`}
      >
        {over ? "Goal exceeded" : "Within goal 🎉"}
      </p>
    </div>
  );
}

export default GoalCard;
