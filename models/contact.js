import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  type: String,
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
