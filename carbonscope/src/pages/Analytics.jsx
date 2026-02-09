import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";
import EmissionTrendChart from "../components/EmissionTrendChart";
import WeeklySummary from "../components/WeeklySummary";

function Analytics() {
  const { history } = useContext(ActivityContext);

  // Empty State
  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Analytics
          </h2>
          <p className="text-sm text-gray-500">
            Add activity data to see emission trends and summaries.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Analytics
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track your emission trends and weekly performance
          </p>
        </div>

        {/* Weekly Summary */}
        <WeeklySummary />

        {/* Trend Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Emission Trend
          </h3>
          <EmissionTrendChart history={history} />
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Emission History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Date</th>
                  <th className="py-2 text-right">Total CO₂ (kg)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-3 text-gray-700">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>

                    <td className="py-3 text-right font-medium text-green-700">
                      {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
