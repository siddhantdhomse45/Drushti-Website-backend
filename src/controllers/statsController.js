import Stat from "../models/statsModel.js";

// ➤ CREATE Stat
export const addStat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const newStat = await Stat.create({
      image: req.file.path, // CLOUDINARY URL
      number: req.body.number,
      suffix: req.body.suffix,
      label: req.body.label,
    });

    res.status(201).json({
      success: true,
      message: "Stat added successfully",
      data: newStat,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding stat", error });
  }
};

// ➤ READ: Get All Stats
export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stats", error });
  }
};

// ➤ READ: Single
export const getSingleStat = async (req, res) => {
  try {
    const stat = await Stat.findById(req.params.id);

    if (!stat) {
      return res.status(404).json({ success: false, message: "Stat not found" });
    }

    res.status(200).json({ success: true, data: stat });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stat", error });
  }
};

// ➤ UPDATE Stat
export const updateStat = async (req, res) => {
  try {
    const updateData = {
      number: req.body.number,
      suffix: req.body.suffix,
      label: req.body.label,
    };

    if (req.file) {
      updateData.image = req.file.path; // CLOUDINARY URL
    }

    const updatedStat = await Stat.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedStat) {
      return res.status(404).json({ success: false, message: "Stat not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stat updated successfully",
      data: updatedStat,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating stat", error });
  }
};

// ➤ DELETE Stat
export const deleteStat = async (req, res) => {
  try {
    const deletedStat = await Stat.findByIdAndDelete(req.params.id);

    if (!deletedStat) {
      return res.status(404).json({ success: false, message: "Stat not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stat deleted successfully",
      data: deletedStat,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting stat", error });
  }
};
