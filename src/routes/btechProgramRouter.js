import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addBtechProgram,
  getBtechPrograms,
  deleteBtechProgram,
} from "../controllers/btechController.js";

const btechProgramRouter = Router();

btechProgramRouter.post("/addprogram", upload.single("document"), addBtechProgram);
btechProgramRouter.get("/getprogram", getBtechPrograms);
btechProgramRouter.delete("/deleteprogram/:id", deleteBtechProgram);

export default btechProgramRouter;
