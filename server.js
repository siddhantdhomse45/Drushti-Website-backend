// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "../education-backend/src/config/db.js";
// import resultRoutes from "../education-backend/src/routes/resultRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: "http://localhost:5173", // if using Vite
//   methods: ["GET", "POST"],
//   credentials: true
// }));
// app.use(express.json());

// // ✅ Routes
// app.use("/api/result", resultRoutes);

// // ✅ Server start
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../education-backend/src/config/db.js";
import resultRoutes from "../education-backend/src/routes/resultRoutes.js";
import galleryRoutes from "../education-backend/src/routes/galleryRoutes.js";
import EventRoutes from "../education-backend/src/routes/EventRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Routes
app.use("/api/result", resultRoutes);
app.use("/api/gallery", galleryRoutes); // 🔥 Cloudinary Gallery Routes
app.use("/api/event", EventRoutes);
// ✅ Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
