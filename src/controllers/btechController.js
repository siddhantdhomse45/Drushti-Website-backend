import BtechProgram from "../models/btechSchema.js";

// 📘 Add new B.Tech program/course
export const addBtechProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    let program = await BtechProgram.findOne({ programName });

    if (!program) {
      program = new BtechProgram({ programName, courses: [] });
    }

    const newCourse = {
      courseName,
      duration,
      semester,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    };

    program.courses.push(newCourse);
    await program.save();

    res.status(201).json({
      success: true,
      message: "B.Tech course added successfully",
      program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add B.Tech program",
      error: error.message,
    });
  }
};

// 📘 Get all B.Tech programs
export const getBtechPrograms = async (req, res) => {
  try {
    const programs = await BtechProgram.find();
    res.status(200).json({
      success: true,
      message: "All B.Tech programs fetched successfully",
      programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch B.Tech programs",
      error: error.message,
    });
  }
};

// 📘 Delete B.Tech program
export const deleteBtechProgram = async (req, res) => {
  try {
    const id = req.params.id;
    await BtechProgram.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "B.Tech program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete B.Tech program",
      error: error.message,
    });
  }
};
