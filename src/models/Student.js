import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  seatNumber: { type: String, required: true, trim: true },
  standard: { type: String, required: true, trim: true },
  branch: { type: String, required: true, trim: true },
  subjects: {type:Object},
  total: {type:Number},
  percentage: {type:Number},
  status: { type: String, required: true, trim: true },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
