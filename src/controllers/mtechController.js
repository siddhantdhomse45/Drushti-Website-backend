import MtechProgram from "../models/mtechModel.js";

// 📌 Add new M.Tech program/course
export const addMtechProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    let program = await MtechProgram.findOne({ programName });

    if (!program) {
      program = new MtechProgram({ programName, courses: [] });
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
      message: "M.Tech program added successfully!",
      program,
    });
  } catch (error) {
    console.error("Error adding M.Tech program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get all M.Tech programs
export const getMtechPrograms = async (req, res) => {
  try {
    const programs = await MtechProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching M.Tech programs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete a specific M.Tech program by ID
export const deleteMtechProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MtechProgram.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Program not found" });

    res.status(200).json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting M.Tech program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
