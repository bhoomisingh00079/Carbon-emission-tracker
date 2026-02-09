import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Resolve absolute path safely (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 FORCE dotenv to load the correct file every time
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Debug once
console.log("GEMINI KEY LOADED:", !!process.env.GEMINI_API_KEY);

import app from "./app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
