const mediaSchema = new mongoose.Schema({
  type: String, // image | video | document
  url: String,
}, { timestamps: true });

export default mongoose.model("Media", mediaSchema);
