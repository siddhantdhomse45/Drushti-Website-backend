import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  number: { type: Number, required: true },
  suffix: { type: String, default: "+" },
  label: { type: String, required: true },
});

export default mongoose.model("Stat", statsSchema);
