import mongoose from "mongoose";

// Schema for individual courses within a diploma program
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true }, // e.g., "6 months", "1 year"
  semester: { type: String, default: null, trim: true },   // optional if relevant
  eligibility: { type: String, default: null, trim: true },// optional eligibility
  syllabusPdf: { type: String, default: null },            // path to syllabus file
  hasSyllabusPdf: { type: Boolean, default: false },
});

// Schema for the diploma program itself
const diplomaProgramSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true, trim: true },
   
    courses: [courseSchema],                               
  },
  { timestamps: true }
);

const DiplomaProgram = mongoose.model("DiplomaProgram", diplomaProgramSchema);

export default DiplomaProgram;
