const communicationSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: String,
}, { timestamps: true });

export default mongoose.model("Communication", communicationSchema);
