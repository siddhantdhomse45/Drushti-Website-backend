// src/controllers/itiController.js
import ITIProgram from "../models/itiModel.js";

export const addITIProgram = async (req, res) => {
  try {
    const { programName, courseName, duration, semester, eligibility } = req.body;

    // -------------------------------
    // 1️⃣ Handle PDF Upload (Cloudinary / Local)
    // -------------------------------
    let syllabusPdf = null;
    let hasSyllabusPdf = false;

    if (req.file) {
      // If file path is Cloudinary URL
      if (req.file.path.startsWith("http")) {
        syllabusPdf = req.file.path;
      } else {
        // Local storage → convert to public URL
        syllabusPdf = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      }
      hasSyllabusPdf = true;
    }

    // -------------------------------
    // 2️⃣ Check if program exists
    // -------------------------------
    let program = await ITIProgram.findOne({ programName });

    if (!program) {
      program = new ITIProgram({
        programName,
        courses: []
      });
    }

    // -------------------------------
    // 3️⃣ Create the new course
    // -------------------------------
    const newCourse = {
      courseName,
      duration,
      semester,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf
    };

    program.courses.push(newCourse);

    // -------------------------------
    // 4️⃣ Save program
    // -------------------------------
    await program.save();

    return res.status(201).json({
      success: true,
      message: "ITI Course added successfully",
      program
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add ITI Program",
      error: error.message
    });
  }
};


// ------------------------------------------------------
// 📌 Get All ITI Programs
// ------------------------------------------------------
export const getITIPrograms = async (req, res) => {
  try {
    const programs = await ITIProgram.find();

    return res.status(200).json({
      success: true,
      message: "All ITI Programs fetched successfully",
      programs
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ITI Programs",
      error: error.message
    });
  }
};


// ------------------------------------------------------
// 📌 Delete ITI Program
// ------------------------------------------------------
export const deleteITIProgram = async (req, res) => {
  try {
    const { id } = req.params;
    await ITIProgram.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "ITI Program deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete ITI Program",
      error: error.message
    });
  }
};
