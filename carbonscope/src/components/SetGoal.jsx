import { useContext, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";

function SetGoal() {
  const { goal, setGoal } = useContext(ActivityContext);
  const [value, setValue] = useState(goal);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-medium mb-3">Set Daily Goal</h3>

      <div className="flex gap-3 items-center">
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-3 py-2 rounded-md w-24"
        />

        <span className="text-sm text-gray-600">kg CO₂</span>

        <button
          onClick={() => setGoal(Number(value))}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SetGoal;
