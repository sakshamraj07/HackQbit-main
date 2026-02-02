import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📌 Chat with AI (text-based)
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Define system and user messages
    const messages = [
      {
        role: "system",
        content: `
          You are a professional health assistant.
Answer only questions about fitness, nutrition, medicine, mental health, or lifestyle.
If the question is not health-related, reply: "I'm designed to answer health-related queries only."
Be short, clear, and medically accurate.

        `,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Send request to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4o" if you have access
      messages,
    });

    // Extract assistant's reply
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Something went wrong with the AI service",
      details: error.response?.data || error.message,
    });
  }
};

