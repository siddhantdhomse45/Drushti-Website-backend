import Student from "../models/Student.js";

// @desc   Fetch student result by Roll/Seat Number and Mother's Name
// @route  POST /api/result/search
// @access Public
export const getStudentResult = async (req, res) => {
  try {
    const { seatNumber, motherName } = req.body;

    if (!seatNumber || !motherName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const student = await Student.findOne({
      seatNumber: seatNumber.trim(),
      motherName: { $regex: new RegExp(motherName.trim(), "i") },
    });

    if (!student) {
      return res.status(404).json({ message: "No student found" });
    }

    res.json(student);
  } catch (error) {
    console.error("❌ Error in getStudentResult:", error);
    res.status(500).json({ message: "Server Error" ,
      error:error.message
    });
  }
};
