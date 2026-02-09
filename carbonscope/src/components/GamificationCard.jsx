import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function GamificationCard() {
  const { getStreak, getBadges } = useContext(ActivityContext);

  const streak = getStreak();
  const badges = getBadges();

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Your Eco Progress
      </h3>

      {/* Streak */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Current Streak</p>
        <p className="text-3xl font-bold text-green-600">
          🔥 {streak} day{streak !== 1 && "s"}
        </p>
      </div>

      {/* Badges */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Badges Earned</p>

        {badges.length === 0 ? (
          <p className="text-sm text-gray-400">
            No badges yet — keep going!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamificationCard;
