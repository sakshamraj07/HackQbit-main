// backend/controllers/healthController.js
import { generateFakeHealthData } from "../utils/simulateDevice.js";

export const getHealthData = (req, res) => {
  const data = generateFakeHealthData();
  res.json(data);
};
