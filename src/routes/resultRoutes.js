import express from "express";
import { getStudentResult } from "../controllers/resultController.js";

const router = express.Router();

// POST /api/result/search
router.post("/search", getStudentResult);

export default router;
