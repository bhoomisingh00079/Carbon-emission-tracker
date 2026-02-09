import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ActivityContext } from "../context/ActivityContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { getStreak, getBadges } = useContext(ActivityContext);
  const navigate = useNavigate();

  const streak = getStreak();
  const badges = getBadges();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Profile
          </h2>
          <p className="text-sm text-gray-500">
            Account & eco achievements
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium text-gray-800">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 Eco Streak */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            Eco Streak
          </h3>
          <p className="text-sm text-gray-500">
            Consecutive days under your emission goal
          </p>

          <p className="mt-3 text-3xl font-bold text-green-600">
            🔥 {streak} day{streak !== 1 && "s"}
          </p>
        </div>

        {/* 🏅 Badges */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Badges Earned
          </h3>

          {badges.length === 0 ? (
            <p className="text-sm text-gray-400">
              No badges yet — keep logging activities!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700
                       border border-red-200 hover:border-red-300
                       px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
