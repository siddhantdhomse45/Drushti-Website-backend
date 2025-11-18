import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addSchoolProgram,
  getSchoolPrograms,
  deleteSchoolProgram,
} from "../controllers/schoolProgramController.js";

const schoolProgramRouter = Router();

// Add new school program
schoolProgramRouter.post("/addprogram", upload.single("document"), addSchoolProgram);

// Get all school programs
schoolProgramRouter.get("/getprogram", getSchoolPrograms);

// Delete a school program by ID
schoolProgramRouter.delete("/deleteprogram/:id", deleteSchoolProgram);

export default schoolProgramRouter;
