import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  getCurrrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", asyncHandler(registerUser));
authRoute.post("/login", asyncHandler(loginUser));
authRoute.post("/logout", asyncHandler(logoutUser));
authRoute.get("/me", authMiddleware, asyncHandler(getCurrrentUser));

export default authRoute;
