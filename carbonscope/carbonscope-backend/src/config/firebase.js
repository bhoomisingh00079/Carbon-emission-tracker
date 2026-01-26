import * as dotenv from "dotenv";
dotenv.config(); // 🔥 MUST be here

import admin from "firebase-admin";

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("❌ FIREBASE_PRIVATE_KEY missing. Check .env file.");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  })
});

export const db = admin.firestore();
export const auth = admin.auth();
