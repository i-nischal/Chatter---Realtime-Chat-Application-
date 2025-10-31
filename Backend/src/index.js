import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRoute from "./routes/auth/user.routes.js";
import "dotenv/config";

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ExpressJs" });
});
app.use("/api/auth", userRoute);

const startServer = async () => {
  connectDB();
  try {
    app.listen(PORT, () => {
      console.log(`Server is running at : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server start to failed", error.message);
  }
};

startServer();
