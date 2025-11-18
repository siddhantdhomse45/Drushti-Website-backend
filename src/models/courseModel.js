import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // store uploaded image path
    tag: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    lessons: { type: Number, required: true },
    seats: { type: Number, required: true },
    years: { type: Number, required: true },

    price: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
