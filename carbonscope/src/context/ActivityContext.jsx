import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [activity, setActivity] = useState(null);
  const [emissions, setEmissions] = useState(null);
  const [history, setHistory] = useState([]);
  const [goal, setGoal] = useState(10);

  /* ======================
     🔥 REAL-TIME FIRESTORE LISTENER (USER-WISE)
     ====================== */
  useEffect(() => {
    if (!user) {
      setHistory([]);
      setEmissions(null);
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "activities"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp
          ? doc.data().timestamp.toDate().toISOString()
          : new Date().toISOString(),
      }));

      setHistory(data);
    });

    return () => unsubscribe();
  }, [user]);

  /* ======================
     🔥 DERIVE EMISSIONS FROM FIRESTORE DATA
     ====================== */
  useEffect(() => {
    if (history.length === 0) {
      setEmissions(null);
      return;
    }

    const latest = history[history.length - 1];

    setEmissions({
      transport: latest.transportKm * 0.21,
      electricity: latest.electricityKwh * 0.82,
      food: latest.foodType === "non-veg" ? 3 : 1.5,
      total: latest.total,
    });
  }, [history]);

  /* ======================
     🔥 SAVE ACTIVITY (FIRESTORE ONLY)
     ====================== */
  const saveActivity = async (data) => {
    if (!user) return;

    const transportEmission = data.transportKm * 0.21;
    const electricityEmission = data.electricityKwh * 0.82;
    const foodEmission = data.foodType === "non-veg" ? 3 : 1.5;

    const total =
      transportEmission + electricityEmission + foodEmission;

    const activityDoc = {
      transportKm: data.transportKm,
      electricityKwh: data.electricityKwh,
      foodType: data.foodType,
      total,
      timestamp: serverTimestamp(),
    };

    await addDoc(
      collection(db, "users", user.uid, "activities"),
      activityDoc
    );

    setActivity(data);
  };

  /* ======================
     🏆 GAMIFICATION HELPERS
     ====================== */
  const getDailyBestTotals = () => {
  const map = {};

  history.forEach((item) => {
    const day = new Date(item.timestamp)
      .toISOString()
      .split("T")[0];

    // ✅ keep ONLY the best (lowest) emission for that day
    if (!map[day] || item.total < map[day]) {
      map[day] = item.total;
    }
  });

  return map;
};

const getStreak = () => {
  const dailyTotals = getDailyBestTotals();
  const dates = Object.keys(dailyTotals).sort().reverse();

  let streak = 0;

  for (let date of dates) {
    if (dailyTotals[date] <= goal) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

 
const getBadges = () => {
  if (!history.length) return [];

  const badges = [];
  const streak = getStreak();
  const daysLogged = Object.keys(getDailyBestTotals()).length;

  if (streak >= 3) badges.push("🌱 Green Starter");
  if (streak >= 7) badges.push("🔥 Eco Streak");
  if (daysLogged >= 10) badges.push("📊 Consistency Champ");

  return badges;
};
  

  return (
    <ActivityContext.Provider
      value={{
        activity,
        emissions,
        history,
        goal,
        setGoal,
        saveActivity,
        getStreak,
        getBadges,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
