import Course from "../models/courseModel.js";

// ➤ Create Course (with image)
export const addCourse = async (req, res) => {
  try {
    const {
      tag,
      title,
      description,
      lessons,
      seats,
      years,
      price,
      rating,
    } = req.body;

    // image from multer
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const course = await Course.create({
      image,
      tag,
      title,
      description,
      lessons,
      seats,
      years,
      price,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get Single Course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update Course (with image optional)
export const updateCourse = async (req, res) => {
  try {
    const updateData = req.body;

    // if image updated
    if (req.file) updateData.image = req.file.path;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
