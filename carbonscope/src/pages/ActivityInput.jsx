import { useContext, useState } from "react";
import { ActivityContext } from "../context/ActivityContext";

function ActivityInput() {
  const { saveActivity } = useContext(ActivityContext);

  const [transport, setTransport] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [food, setFood] = useState("veg");
  const [mood, setMood] = useState("normal");

  // live calculation
  const transportEmission = transport * 0.21;
  const electricityEmission = electricity * 0.82;
  const foodEmission = food === "non-veg" ? 3 : 1.5;
  const total = transportEmission + electricityEmission + foodEmission;

  const handleSubmit = (e) => {
    e.preventDefault();

    saveActivity({
      transportKm: transport,
      electricityKwh: electricity,
      foodType: food,
      mood,
    });

    setTransport(0);
    setElectricity(0);
    setFood("veg");
    setMood("normal");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Daily Activity
        </h2>
        <p className="text-gray-400">
          Log today’s activities and see your carbon impact instantly
        </p>
      </div>

      {/* LIVE PREVIEW */}
      <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-6">
        <p className="text-sm text-green-400 mb-1">Estimated emissions</p>
        <p className="text-3xl font-bold text-green-500">
          {total.toFixed(2)} kg CO₂
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-5">

          {/* Transport */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Transport Distance (km)
            </label>
            <input
              type="number"
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              🚶 Walking saves ~2kg CO₂ per 10km
            </p>
          </div>

          {/* Electricity */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Electricity Usage (kWh)
            </label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Food */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Food Preference
            </label>
            <select
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="veg">Vegetarian 🌱</option>
              <option value="non-veg">Non-Vegetarian 🍗</option>
            </select>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">

          {/* PRESETS */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-3">Quick presets</p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setTransport(0);
                  setElectricity(4);
                }}
                className="px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700"
              >
                🏠 Work from home
              </button>

              <button
                type="button"
                onClick={() => {
                  setTransport(8);
                  setElectricity(3);
                }}
                className="px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700"
              >
                🚗 Short commute
              </button>
            </div>
          </div>

          {/* MOOD */}
          <div>
            <p className="text-sm text-gray-400 mb-2">
              How was today?
            </p>
            <div className="flex gap-3">
              {["easy", "normal", "hard"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`px-4 py-2 rounded-md text-sm
                    ${mood === m
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300"}`}
                >
                  {m === "easy" && "😌 Easy"}
                  {m === "normal" && "🙂 Normal"}
                  {m === "hard" && "😓 Hard"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700
                       text-white font-semibold py-3 rounded-lg transition"
          >
            Save Activity
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityInput;
