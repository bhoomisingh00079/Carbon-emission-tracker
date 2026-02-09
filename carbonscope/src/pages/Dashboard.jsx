import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import GoalCard from "../components/GoalCard";
import SetGoal from "../components/SetGoal";
import EmissionChart from "../components/EmissionChart";
import PageContainer from "../components/PageContainer";

function Dashboard() {
  const { emissions } = useContext(ActivityContext);

  if (!emissions) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
            <p className="text-gray-400">
              Add today’s activity to see your carbon footprint.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      {/* GRID WRAPPER */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="xl:col-span-8 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-gray-400 mt-1">
              Today’s carbon footprint overview
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <EmissionChart emissions={emissions} />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Emission Breakdown</h3>

            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Transport</span>
                <span>{emissions.transport.toFixed(2)} kg</span>
              </li>
              <li className="flex justify-between">
                <span>Electricity</span>
                <span>{emissions.electricity.toFixed(2)} kg</span>
              </li>
              <li className="flex justify-between">
                <span>Food</span>
                <span>{emissions.food.toFixed(2)} kg</span>
              </li>

              <li className="border-t border-gray-800 pt-3 flex justify-between font-semibold text-green-500">
                <span>Total</span>
                <span>{emissions.total.toFixed(2)} kg CO₂</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:col-span-4 flex flex-col gap-6">

          <GoalCard />
          <SetGoal />

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-1">Potential Impact</h3>
            <p className="text-sm text-gray-400">
              You could reduce emissions by
            </p>

            <p className="mt-3 text-3xl font-bold text-green-500">
              {(emissions.total * 0.25).toFixed(2)} kg CO₂
            </p>

            <p className="mt-3 text-xs text-gray-500">
              Based on sustainable daily choices
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-2">Today vs Goal</h3>

            {emissions.total <= 10 ? (
              <p className="text-green-500 text-sm">
                ✅ You’re within your daily goal
              </p>
            ) : (
              <p className="text-red-400 text-sm">
                ⚠️ You exceeded your goal today
              </p>
            )}

            <div className="mt-3 text-sm text-gray-400">
              Total:{" "}
              <span className="text-gray-200">
                {emissions.total.toFixed(2)} kg
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20
                          border border-green-700/40 rounded-xl p-6">
            <h3 className="text-lg font-medium text-green-400 mb-1">
              🌱 Eco Tip
            </h3>

            <p className="text-sm text-gray-300">
              Short trips under 2 km are best walked or cycled — it’s the fastest
              way to reduce daily emissions.
            </p>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
