import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  bio: { type: String },
  
  email: { type: String },
});

export default mongoose.model("Doctor", doctorSchema);
