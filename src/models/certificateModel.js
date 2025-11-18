import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  programName: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  eligibility: { type: String, required: true, trim: true },
  syllabusPdf: { type: String, default: null }, // optional PDF
  hasSyllabusPdf: { type: Boolean, default: false },
}, { timestamps: true });

const CertificateProgram = mongoose.model("CertificateProgram", certificateSchema);

export default CertificateProgram;
