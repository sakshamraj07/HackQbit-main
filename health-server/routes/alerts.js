// routes/alerts.js
import express from "express";
import Alert from "../models/alert.js";
import { sendActivationEmail } from "../utils/mailer.js"; // ✅ new import

const router = express.Router();

/**
 * POST /api/alerts/preferences
 * Save or update user's alert preferences
 */
router.post("/preferences", async (req, res) => {
  try {
    const { name, email, medicine, drinksMoreThan6L, sleepTime } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const alert = await Alert.findOneAndUpdate(
      { email }, // ✅ updated field name
      {
        name,
        email,
        medicine: {
          takesMedicine: medicine?.takesMedicine || false,
          times: medicine?.times || {},
        },
        drinksMoreThan6L: !!drinksMoreThan6L,
        sleepTime: sleepTime || "22:00",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // ✅ send confirmation email
    await sendActivationEmail(email, name);

    res.json({
      success: true,
      message: "Preferences saved successfully. Confirmation email sent.",
      alert,
    });
  } catch (err) {
    console.error("Error saving preferences:", err);
    res.status(500).json({ error: "Server error while saving preferences." });
  }
});

/**
 * GET /api/alerts/preferences/:email
 * Fetch user alert preferences
 */
router.get("/preferences/:email", async (req, res) => {
  try {
    const alert = await Alert.findOne({ email: req.params.email }); // ✅ updated field name
    if (!alert) return res.status(404).json({ error: "Preferences not found" });

    res.json({ success: true, alert });
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching preferences." });
  }
});

export default router;
