import PGPgProgram from "../models/pgDiplomaModel.js";

// 📌 Add new PG Diploma course/program
export const addPgProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    if (!programName || !courseName || !duration || !eligibility) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required: programName, courseName, duration, eligibility" 
      });
    }

    // Find program or create if not exists
    let program = await PGPgProgram.findOne({ programName });
    if (!program) program = new PGPgProgram({ programName, courses: [] });

    program.courses.push({
      courseName,
      duration,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    });

    await program.save();

    res.status(201).json({ 
      success: true, 
      message: "PG Diploma program added successfully", 
      program 
    });
  } catch (error) {
    console.error("Error adding PG Diploma program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get all PG Diploma programs
export const getPgPrograms = async (req, res) => {
  try {
    const programs = await PGPgProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching PG Diploma programs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete PG Diploma program by ID
export const deletePgProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PGPgProgram.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Program not found" });

    res.status(200).json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting PG Diploma program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
