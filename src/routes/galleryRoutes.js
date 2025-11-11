import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const router = express.Router();

// ✅ Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "education-gallery", // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// ✅ Upload image to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    res.json({
      success: true,
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
});

// ✅ Get all images (optional - if you store them in DB)
router.get("/", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "education-gallery/",
      max_results: 50,
    });

    const images = result.resources.map((img) => img.secure_url);
    res.json(images);
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;
