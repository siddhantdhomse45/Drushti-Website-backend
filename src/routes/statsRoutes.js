import express from "express";
import {
  addStat,
  getStats,
  getSingleStat,
  updateStat,
  deleteStat,
} from "../controllers/statsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addStat);
router.get("/all", getStats);
router.get("/:id", getSingleStat);
router.put("/update/:id", upload.single("image"), updateStat);
router.delete("/delete/:id", deleteStat);

export default router;
