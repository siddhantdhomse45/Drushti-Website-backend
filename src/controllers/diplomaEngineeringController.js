import DiplomaEngineering from "../models/diplomaEngineeringSchema.js";

// 📘 Add a new Diploma Engineering course
export const addDiplomaProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    let program = await DiplomaEngineering.findOne({ programName });

    if (!program) {
      program = new DiplomaEngineering({
        programName,
        courses: [],
      });
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

    return res.status(201).json({
      success: true,
      message: "Diploma Engineering course added successfully",
      program,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add Diploma Engineering program",
      error: error.message,
    });
  }
};

// 📘 Get all Diploma Engineering programs
export const getDiplomaPrograms = async (req, res) => {
  try {
    const programs = await DiplomaEngineering.find();
    return res.status(200).json({
      success: true,
      message: "All Diploma Engineering programs fetched successfully",
      programs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Diploma Engineering programs",
      error: error.message,
    });
  }
};

// 📘 Delete Diploma Engineering program by ID
export const deleteDiplomaProgram = async (req, res) => {
  try {
    const id = req.params.id;
    await DiplomaEngineering.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Diploma Engineering program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Diploma Engineering program",
      error: error.message,
    });
  }
};
