// models/Alert.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

// ✅ Nested schema for medicine timing preferences
const MedicineSchema = new Schema({
  takesMedicine: { type: Boolean, default: false },
  times: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false },
  },
});

// ✅ Main Alert schema
const AlertSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // renamed userEmail → email for consistency
    medicine: { type: MedicineSchema, default: () => ({}) },
    drinksMoreThan6L: { type: Boolean, default: false },
    sleepTime: { type: String, default: "22:00" },
    createdAt: { type: Date, default: Date.now },
    doctorReminderSent: { type: Boolean, default: false },
  },
  { timestamps: true } // optional, adds createdAt + updatedAt automatically
);

export default model("Alert", AlertSchema);
