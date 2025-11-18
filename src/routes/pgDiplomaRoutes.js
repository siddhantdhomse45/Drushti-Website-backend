import { Router } from "express";
import upload from "../middleware/upload.js"; // multer for file uploads
import { addPgProgram, getPgPrograms, deletePgProgram } from "../controllers/pgDiplomaController.js";

const pgRouter = Router();

pgRouter.post("/addprogram", upload.single("document"), addPgProgram);
pgRouter.get("/getprogram", getPgPrograms);
pgRouter.delete("/deleteprogram/:id", deletePgProgram);

export default pgRouter;
