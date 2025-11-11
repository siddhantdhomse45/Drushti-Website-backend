import Program from "../models/programSchema.js";


export const underGrad = async (req, res) => {
  try {
    const { programName, courseName, duration,semester, eligibility,  } = req.body;

    // syllabus PDF from upload (optional)
    const syllabusPdf = req.file ? req.file.path :null;

    // Find program
    let program = await Program.findOne({ programName });

    // If program does not exist, create it
    if (!program) {
      program = new Program({
        programName,
        courses: []
      });
    }

    // Create course object
    const newCourse = {
      courseName,
      duration,
      semester,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf ? true : false
    };

    // Push course to program
    program.courses.push(newCourse);

    // Save program
    await program.save();

    return res.status(201).json({
      success: true,
      message: "Course added successfully",
      program
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add Program",
      error: error.message
    });
  }
};
