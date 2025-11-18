import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addDiplomaProgram,
  getDiplomaPrograms,
  deleteDiplomaProgram,
} from "../controllers/diplomaEngineeringController.js";

const router = Router();

// ✅ Add Diploma Program
router.post("/addprogram", upload.single("document"), addDiplomaProgram);

// ✅ Get All Programs
router.get("/getprogram", getDiplomaPrograms);

// ✅ Delete Program
router.delete("/deleteprogram/:id", deleteDiplomaProgram);

export default router;
