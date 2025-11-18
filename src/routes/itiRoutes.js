// src/routes/itiRoutes.js
import express from "express";
import { addITIProgram, getITIPrograms, deleteITIProgram } from "../controllers/itiController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/addprogram", upload.single("document"), addITIProgram);

router.get("/getprogram", getITIPrograms);
router.delete("/deleteprogram/:id", deleteITIProgram);

export default router;
