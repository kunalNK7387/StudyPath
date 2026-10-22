import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import authMiddleware from "./src/middleware/authMiddleware.js";
import aiRoutes from "./src/routes/ai.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://study-path-seven.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    const isVercelPreview =
      origin &&
      /^https:\/\/study-path-[a-z0-9-]+-kunalkhairnar595-9147s-projects\.vercel\.app$/.test(
        origin,
      );

    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware must run before the routes.
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Authentication routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Study app is working");
});

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

// AI routes
app.use("/api/ai", aiRoutes);

const startServer = async () => {
  try {
    await connectToDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
