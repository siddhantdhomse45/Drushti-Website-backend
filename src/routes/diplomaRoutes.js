import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addDiplomaProgram,
  getDiplomaPrograms,
  deleteDiplomaProgram,
  // updateDiplomaProgram,
} from "../controllers/diplomaController.js";

const diplomaProgramRouter = Router();

// 📌 Add new diploma program or course
diplomaProgramRouter.post("/addprogram", upload.single("document"), addDiplomaProgram);

// 📌 Get all diploma programs
diplomaProgramRouter.get("/getprogram", getDiplomaPrograms);

// 📌 Delete a diploma program by ID
diplomaProgramRouter.delete("/deleteprogram/:id", deleteDiplomaProgram);

// // 📌 Update a diploma program by ID
// diplomaProgramRouter.put("/updateprogram/:id", upload.single("document"), updateDiplomaProgram);

export default diplomaProgramRouter;
