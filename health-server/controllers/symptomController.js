
import OpenAI from "openai";
import dotenv from "dotenv";
import SymptomHistory from "../models/Symptom.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📌 Symptom Checker with OpenAI
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;

    const userId = req.user.id;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

    const messages = [
      {
        role: "system",
        content: `
          You are a medical assistant.
          The user is a ${age}-year-old ${gender}.
          Provide only JSON.
          Output format:
          {
            "conditions": [
              {
                "name": "",
                "description": "",
                
                "treatments": "",
                "medicine": "",
                "cta": ""
              }
            ]
          }
        `
      },
      {
        role: "user",
        content: `The patient has these symptoms: ${symptoms.join(", ")}. Suggest possible conditions.`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const textResponse = completion.choices[0].message.content.trim();

    const jsonStart = textResponse.indexOf("{");
    const jsonEnd = textResponse.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(200).json({ error: "Invalid AI response", rawResponse: textResponse });
    }

    const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);
    const parsedData = JSON.parse(jsonString);

    const newHistory = new SymptomHistory({
      user: userId,
      symptoms,
      age,
      gender,
      results: parsedData.conditions,
    });
    await newHistory.save();

    res.json(parsedData);
  } catch (error) {
    console.error("Error checking symptoms:", error);
    if (error instanceof SyntaxError) {
      return res.status(200).json({ error: "AI response parsing failed", rawResponse: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get Symptom History
export const getSymptomHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await SymptomHistory.find({ user: userId }).sort({ createdAt: -1 }).lean();
    res.json({ history });
  } catch (error) {
    console.error("Error fetching symptom history:", error);
    res.status(500).json({ error: "Failed to fetch history." });
  }
};

// 📌 Delete Symptom History
export const deleteSymptomHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SymptomHistory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "History entry not found" });
    res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ message: "Server error while deleting history" });
  }
};
