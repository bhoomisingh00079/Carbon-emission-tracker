export function generateWeeklyReport(weeklyData, lastWeekTotal = null) {
  let totals = {
    electricity: 0,
    transport: 0,
    food: 0
  };

  weeklyData.forEach(day => {
    totals.electricity += day.electricity;
    totals.transport += day.transport;
    totals.food += day.food;
  });

  const weeklyTotal =
    totals.electricity + totals.transport + totals.food;

  const dailyAverage = Math.round(weeklyTotal / 7);

  const highestCategory = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])[0][0];

  let trend = "No comparison available";
  if (lastWeekTotal !== null) {
    const diff = weeklyTotal - lastWeekTotal;
    trend =
      diff > 0
        ? `⬆️ Increased by ${diff} kg CO₂`
        : diff < 0
        ? `⬇️ Reduced by ${Math.abs(diff)} kg CO₂`
        : "➖ No change from last week";
  }

  return {
    weeklyTotal,
    dailyAverage,
    highestCategory,
    trend
  };
}
