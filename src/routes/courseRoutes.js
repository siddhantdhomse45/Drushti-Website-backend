import express from "express";
import upload from "../middleware/upload.js";
import {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Create Course (image upload)
router.post("/add", upload.single("image"), addCourse);

// Read
router.get("/all", getCourses);       // all courses
router.get("/:id", getCourse);        // single course

// Update
router.put("/update/:id", upload.single("image"), updateCourse);

// Delete
router.delete("/delete/:id", deleteCourse);

export default router;
