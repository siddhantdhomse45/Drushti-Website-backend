import mongoose from "mongoose";

const pgCourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  eligibility: { type: String, required: true, trim: true },
  syllabusPdf: { type: String, default: null }, // optional PDF link
  hasSyllabusPdf: { type: Boolean, default: false },
}, { timestamps: true });

const pgProgramSchema = new mongoose.Schema({
  programName: { type: String, required: true, trim: true },
  courses: [pgCourseSchema],
}, { timestamps: true });

const PGPgProgram = mongoose.model("PGDiplomaProgram", pgProgramSchema);

export default PGPgProgram;
