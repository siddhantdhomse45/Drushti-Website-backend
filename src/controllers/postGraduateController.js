import PostGraduateProgram from "../models/postGraduateSchema.js";

// 📘 Add a new postgraduate program/course
export const postGrad = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;

    // syllabus PDF from upload (optional)
    const syllabusPdf = req.file ? req.file.path : null;

    // Find program
    let program = await PostGraduateProgram.findOne({ programName });

    // If program does not exist, create it
    if (!program) {
      program = new PostGraduateProgram({
        programName,
        courses: [],
      });
    }

    // Create course object
    const newCourse = {
      courseName,
      duration,
      semester,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    };

    // Push course to program
    program.courses.push(newCourse);

    // Save program
    await program.save();

    return res.status(201).json({
      success: true,
      message: "Postgraduate course added successfully",
      program,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add postgraduate program",
      error: error.message,
    });
  }
};

// 📘 Get all postgraduate programs
export const getPostGradPrograms = async (req, res) => {
  try {
    const programs = await PostGraduateProgram.find();
    return res.status(200).json({
      success: true,
      message: "All postgraduate programs fetched successfully",
      programs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch postgraduate programs",
      error: error.message,
    });
  }
};

// 📘 Delete postgraduate program by ID
export const deletePostGradProgram = async (req, res) => {
  try {
    const id = req.params.id;
    await PostGraduateProgram.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Postgraduate program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete postgraduate program",
      error: error.message,
    });
  }
};
