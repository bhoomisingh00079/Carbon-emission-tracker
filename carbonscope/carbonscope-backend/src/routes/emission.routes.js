import express from "express";
import authenticateUser from "../middleware/auth.js";
import { getWeeklyEmission } from "../controllers/emission.controller.js";

const router = express.Router();

router.get("/weekly", authenticateUser, getWeeklyEmission);

export default router;
