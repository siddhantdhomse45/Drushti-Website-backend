import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  eligibility: { type: String, required: true, trim: true },
  syllabusPdf: { type: String, default: null },
  hasSyllabusPdf: { type: Boolean, default: false },
});

const itiProgramSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true, trim: true },
    courses: [courseSchema],
  },
  { timestamps: true }
);

const ITIProgram = mongoose.model("ITIProgram", itiProgramSchema);

export default ITIProgram;
