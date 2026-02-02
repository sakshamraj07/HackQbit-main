// backend/routes/healthRoutes.js
import express from "express";
import { getHealthData } from "../controllers/healthController.js";

const router = express.Router();

router.get("/monitor", getHealthData);

export default router;
