import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  getCurrrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post("/register", asyncHandler(registerUser));
userRoute.post("/login", asyncHandler(loginUser));
userRoute.post("/logout", asyncHandler(logoutUser));
userRoute.get("/me", authMiddleware, asyncHandler(getCurrrentUser));

export default userRoute;
