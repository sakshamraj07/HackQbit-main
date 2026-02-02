import PDFParser from "pdf2json";
import Tesseract from "tesseract.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import Report from "../models/Report.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyzeReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(req.file.buffer);
    } else if (["image/png", "image/jpeg"].includes(req.file.mimetype)) {
      const result = await Tesseract.recognize(req.file.buffer, "eng");
      extractedText = result.data.text;
    } else {
      return res.status(400).json({ error: "Only PDF, JPG, or PNG allowed" });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: "Could not extract text from file" });
    }

    const messages = [
      {
        role: "system",
        content: `
          You are a medical assistant. 
          The user uploaded a medical report.
          Explain the report in simple, clear language.
          Highlight key findings and suggest next steps.
        `,
      },
      {
        role: "user",
        content: `Here is the report text:\n${extractedText}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const explanation = completion.choices[0].message.content.trim();

    const newReport = new Report({
      name: req.file.originalname,
      extractedText,
      explanation,
    });
    await newReport.save();

    res.json({
      success: true,
      extractedText,
      explanation,
    });
  } catch (error) {
    console.error("Report analysis error:", error);
    res.status(500).json({ error: "Something went wrong while analyzing report" });
  }
};

// Helper function to extract text from PDF
const extractTextFromPDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";
      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((t) => {
          t.R.forEach((r) => {
            text += decodeURIComponent(r.T) + " ";
          });
        });
      });
      resolve(text.trim());
    });

    pdfParser.parseBuffer(buffer);
  });
};

// Fetch all reports for history
export const getReportsHistory = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports history:", error);
    res.status(500).json({ error: "Failed to fetch reports history" });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Failed to delete report" });
  }
};
