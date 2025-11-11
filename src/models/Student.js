import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  motherName: String,
  seatNumber: String,
  standard: String,
  branch: String,
  subjects: Object,
  total: Number,
  percentage: Number,
  status: String,
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
