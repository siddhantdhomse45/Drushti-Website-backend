import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addMtechProgram,
  getMtechPrograms,
  deleteMtechProgram,
} from "../controllers/mtechController.js";

const mtechRouter = Router();

mtechRouter.post("/addprogram", upload.single("document"), addMtechProgram);
mtechRouter.get("/getprogram", getMtechPrograms);
mtechRouter.delete("/deleteprogram/:id", deleteMtechProgram);

export default mtechRouter;
