import SchoolProgram from "../models/schoolProgramModel.js";

// Add new school program/course
export const addSchoolProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    if (!programName || !courseName || !duration) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let program = await SchoolProgram.findOne({ programName });

    if (!program) {
      program = new SchoolProgram({ programName, courses: [] });
    }

    program.courses.push({
      courseName,
      duration,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    });

    await program.save();

    res.status(201).json({ success: true, message: "School program added successfully", program });
  } catch (error) {
    console.error("Error adding school program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all school programs
export const getSchoolPrograms = async (req, res) => {
  try {
    const programs = await SchoolProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching school programs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a specific school program by ID
export const deleteSchoolProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SchoolProgram.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    res.status(200).json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting school program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
