import express from "express";

const router = express.Router();

function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.includes("electricity")) return "ELECTRICITY";
  if (text.includes("transport") || text.includes("travel")) return "TRANSPORT";
  if (text.includes("food") || text.includes("diet")) return "FOOD";
  if (text.includes("reduce") || text.includes("lower")) return "REDUCE";
  if (text.includes("hello") || text.includes("hi")) return "GREETING";

  return "GENERAL";
}

router.post("/", (req, res) => {
  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message received." });
  }

  const intent = detectIntent(message);
  const emissions = context?.emissions || {};

  let reply = "";

  switch (intent) {
    case "ELECTRICITY":
      reply = `💡 Your electricity emissions are ${
        emissions.electricity ?? "unknown"
      } kg CO₂.
Try using LED bulbs, unplug idle devices, and prefer energy-efficient appliances.`;
      break;

    case "TRANSPORT":
      reply = `🚲 Transport emissions (${
        emissions.transport ?? "unknown"
      } kg CO₂) can be reduced by walking, cycling, public transport, or carpooling.`;
      break;

    case "FOOD":
      reply = `🥗 Food contributes ${
        emissions.food ?? "unknown"
      } kg CO₂.
Plant-based meals and avoiding food waste help a lot.`;
      break;

    case "REDUCE":
      reply = `🌱 To reduce emissions, focus on your biggest category.
Electricity: ${emissions.electricity ?? "N/A"} kg  
Transport: ${emissions.transport ?? "N/A"} kg  
Food: ${emissions.food ?? "N/A"} kg`;
      break;

    case "GREETING":
      reply = "👋 Hi! I’m CarbonBot. Ask me how to reduce your carbon footprint.";
      break;

    default:
      reply =
        "🌍 I can help with electricity, transport, food, or overall emission reduction.";
  }

  res.json({ reply });
});

import { generateWeeklyReport } from "../utils/weeklyReport.js";

router.post("/weekly-report", (req, res) => {
  const { weeklyData, lastWeekTotal } = req.body;

  if (!weeklyData || weeklyData.length !== 7) {
    return res.status(400).json({ error: "Invalid weekly data" });
  }

  const report = generateWeeklyReport(weeklyData, lastWeekTotal);

  res.json({
    reply: `📊 Weekly Carbon Report
Total: ${report.weeklyTotal} kg CO₂
Daily Avg: ${report.dailyAverage} kg CO₂
Highest Impact: ${report.highestCategory}
Trend: ${report.trend}`
  });
});


export default router;
