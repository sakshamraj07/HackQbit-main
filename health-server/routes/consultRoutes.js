import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Read doctor reply data
  const filePath = path.resolve("./data/doctorReplies.json");
  const raw = fs.readFileSync(filePath);
  const replies = JSON.parse(raw);

  const lowerMsg = message.toLowerCase();

  // Find the best match
  const match = replies.find((r) =>
    r.keywords.some((k) => lowerMsg.includes(k))
  );

  const reply =
    match?.reply ||
    "I need more details to understand your symptoms. Could you please explain a bit more?";

  res.json({ reply });
});

export default router;
