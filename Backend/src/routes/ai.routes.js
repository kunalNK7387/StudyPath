import express from "express";
import { getStudyRecommendations } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import aiMiddleware from "../middleware/aiMiddleware.js";

const router = express.Router();

router.post("/recommendations", aiMiddleware, getStudyRecommendations);

export default router;
