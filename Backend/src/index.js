import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoute from "./routes/auth/auth.routes.js";
import uploadRoute from "./routes/users/upload.routes.js";
import "dotenv/config";
import userRoute from "./routes/users/user.route.js";

const app = express();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Chatter." });
});

app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/users", userRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    errors: err.errors || [],
  });
});

const startServer = async () => {
  await connectDB();
  try {
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
