import { Router } from "express";
import upload from "../middleware/upload.js"; // multer middleware for file uploads
import {
  addCertificateProgram,
  getCertificatePrograms,
  deleteCertificateProgram,
} from "../controllers/certificateController.js";

const certificateRouter = Router();

// Add new certificate program (with optional file upload)
certificateRouter.post("/addprogram", upload.single("document"), addCertificateProgram);

// Get all certificate programs
certificateRouter.get("/getprogram", getCertificatePrograms);

// Delete certificate program by ID
certificateRouter.delete("/deleteprogram/:id", deleteCertificateProgram);

export default certificateRouter;
