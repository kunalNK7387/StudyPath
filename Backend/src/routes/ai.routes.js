import express from "express";
import { getStudyRecommendations } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in students can generate recommendations
router.post("/recommendations", authMiddleware, getStudyRecommendations);

export default router;
