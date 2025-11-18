import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  eligibility: { type: String, default: null, trim: true },
  syllabusPdf: { type: String, default: null },
  hasSyllabusPdf: { type: Boolean, default: false },
});

const programSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true, trim: true },
    courses: [courseSchema],
  },
  { timestamps: true }
);

const SchoolProgram = mongoose.model("SchoolProgram", programSchema);

export default SchoolProgram;
