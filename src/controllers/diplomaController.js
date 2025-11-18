import DiplomaProgram from "../models/diplomaModel.js";

// 📌 Add new Diploma program/course
export const addDiplomaProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    let program = await DiplomaProgram.findOne({ programName });

    if (!program) {
      program = new DiplomaProgram({ programName, duration, courses: [], eligibility });
    }

    program.courses.push({
      courseName,
      duration,
      semester,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    });

    await program.save();

    res.status(201).json({
      success: true,
      message: "Diploma program added successfully!",
      program,
    });
  } catch (error) {
    console.error("Error adding Diploma program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get all Diploma programs
export const getDiplomaPrograms = async (req, res) => {
  try {
    const programs = await DiplomaProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching Diploma programs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete a specific Diploma program by ID
export const deleteDiplomaProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DiplomaProgram.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    res.status(200).json({ success: true, message: "Diploma program deleted successfully" });
  } catch (error) {
    console.error("Error deleting Diploma program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
