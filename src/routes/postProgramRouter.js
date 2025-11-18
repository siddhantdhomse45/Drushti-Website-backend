import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  postGrad,
  getPostGradPrograms,
  deletePostGradProgram,
} from "../controllers/postGraduateController.js";

const postProgramRouter = Router();

// 📘 Add new postgraduate program/course
postProgramRouter.post("/addprograms", upload.single("document"), postGrad);

// 📘 Get all postgraduate programs
postProgramRouter.get("/getprogram", getPostGradPrograms);

// 📘 Delete a postgraduate program by ID
postProgramRouter.delete("/deleteprogram/:id", deletePostGradProgram);

export default postProgramRouter;
