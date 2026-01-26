import { createContext, useState } from "react";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activity, setActivity] = useState(null);
  const [emissions, setEmissions] = useState(null);
  const [history, setHistory] = useState([]); // ✅ FIXED: top-level

  const saveActivity = (data) => {
    setActivity(data);

    // 🔥 MOCK EMISSION CALCULATION
    const transportEmission = data.transportKm * 0.21;
    const electricityEmission = data.electricityKwh * 0.82;
    const foodEmission = data.foodType === "non-veg" ? 3 : 1.5;

    const total =
      transportEmission + electricityEmission + foodEmission;

    const emissionData = {
      transport: transportEmission,
      electricity: electricityEmission,
      food: foodEmission,
      total
    };
    console.log("History before:", history);

    setEmissions(emissionData);

    // ✅ SAVE TO HISTORY
    setHistory((prev) => {
  const updated = [...prev, { date: new Date().toLocaleDateString(), total }];
  console.log("History after:", updated);
  return updated;
});
  };

  return (
    <ActivityContext.Provider
      value={{ activity, emissions, history, saveActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
