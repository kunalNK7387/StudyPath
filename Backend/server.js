import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./src/middleware/authMiddleware.js";

dotenv.config();
const app = express();

connectToDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Study app is working");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

// Start server and handle errors
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
