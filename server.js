


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
import connectDB from "./src/config/db.js";

// ✅ Routes
import galleryRoutes from "./src/routes/galleryRoutes.js";
import EventRoutes from "./src/routes/EventRoutes.js";
import resultRoutes from "./src/routes/resultRoutes.js";
import programRoutes from "./src/routes/programRoutes.js"; // Undergraduate
import postProgramRouter from "./src/routes/postProgramRouter.js"; // ✅ Postgraduate
import diplomaEngineeringRoutes from "./src/routes/diplomaEngineeringRoutes.js";
import btechProgramRouter from "./src/routes/btechProgramRouter.js";
import mtechRoutes from "./src/routes/mtechRoutes.js";
import diplomaRouter from "./src/routes/diplomaRoutes.js";
import certificateRouter from "./src/routes/certificateRoutes.js";
import pgRouter from "./src/routes/pgDiplomaRoutes.js";
import schoolProgramRouter from "./src/routes/schoolProgramRoutes.js";
import itiRoutes from "./src/routes/itiRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import statsRoutes from "./src/routes/statsRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "https://drushti-website-g358.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// allow preflight for all routes
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/result", resultRoutes);
app.use("/api/gallery", galleryRoutes); // 🔥 Cloudinary Gallery Routes
app.use("/api/event", EventRoutes);
app.use("/program-api", programRoutes); // 🎓 Undergraduate Programs
app.use("/postprogram-api", postProgramRouter); // 🎓 Postgraduate Programs
app.use("/diploma-api", diplomaEngineeringRoutes);
app.use("/btech-api", btechProgramRouter);
app.use("/mtech-api", mtechRoutes);
app.use("/diplomaCourse-api", diplomaRouter);
app.use("/certificate", certificateRouter);
app.use("/pgdiploma", pgRouter);
app.use("/schoolprogram", schoolProgramRouter);
app.use("/iti-api", itiRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/testimonial", testimonialRoutes)

// ✅ Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
