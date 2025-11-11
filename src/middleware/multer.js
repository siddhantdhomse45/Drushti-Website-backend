import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload path safely and relative to your project root
const uploadPath = path.join(process.cwd(), "uploads");

// ✅ Ensure the uploads folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // use the ensured folder path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Optional: Allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Final upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

export default upload;
