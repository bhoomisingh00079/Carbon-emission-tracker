import { db } from "../config/firebase.js";
import { getWeekRange } from "../utils/date.utils.js";

export const getWeeklyEmission = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { start, end } = getWeekRange();

    const snapshot = await db
      .collection("activities")
      .where("userId", "==", userId)
      .where("createdAt", ">=", start)
      .where("createdAt", "<=", end)
      .get();

    let totalEmission = 0;
    const breakdown = {
      transport: 0,
      electricity: 0,
      food: 0
    };

    snapshot.forEach(doc => {
      const data = doc.data();
      totalEmission += data.emission;
      breakdown[data.type] += data.emission;
    });

    res.json({
      week: `${start.toDateString()} - ${end.toDateString()}`,
      totalEmission,
      breakdown
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate weekly emission" });
  }
};
