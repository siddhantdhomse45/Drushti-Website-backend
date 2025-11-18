import mongoose from "mongoose";

const postGraduateCourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  semester: { type: String, default: null, trim: true },
  eligibility: { type: String, default: null, trim: true },
  syllabusPdf: { type: String, default: null },
  hasSyllabusPdf: { type: Boolean, default: false },
});

const postGraduateProgramSchema = new mongoose.Schema({
  programName: { type: String, required: true, trim: true },
  courses: { type: [postGraduateCourseSchema], default: [] },
});

export default mongoose.model("PostGraduateProgram", postGraduateProgramSchema);
