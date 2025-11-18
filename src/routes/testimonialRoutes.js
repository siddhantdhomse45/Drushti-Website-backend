import express from "express";
import upload from "../middleware/upload.js";
import {
 addTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.post("/add", upload.single("image"), addTestimonial);
router.get("/", getTestimonials);
router.put("/:id", upload.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
