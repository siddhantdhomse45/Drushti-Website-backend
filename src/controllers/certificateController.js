import CertificateProgram from "../models/certificateModel.js";

// 📌 Add new Certificate program
export const addCertificateProgram = async (req, res) => {
  try {
    const { programName, duration, eligibility } = req.body;
    const syllabusPdf = req.file ? req.file.path : null;

    if (!programName || !duration || !eligibility) {
      return res.status(400).json({
        success: false,
        message: "programName, duration, and eligibility are required",
      });
    }

    const newProgram = new CertificateProgram({
      programName,
      duration,
      eligibility,
      syllabusPdf,
      hasSyllabusPdf: !!syllabusPdf,
    });

    await newProgram.save();

    res.status(201).json({
      success: true,
      message: "Certificate program added successfully!",
      program: newProgram,
    });
  } catch (error) {
    console.error("Error adding Certificate program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Get all Certificate programs
export const getCertificatePrograms = async (req, res) => {
  try {
    const programs = await CertificateProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching Certificate programs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📌 Delete a Certificate program by ID
export const deleteCertificateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CertificateProgram.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    res.status(200).json({ success: true, message: "Certificate program deleted successfully" });
  } catch (error) {
    console.error("Error deleting Certificate program:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
