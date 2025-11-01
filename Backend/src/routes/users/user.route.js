import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { getAllUsers } from "../../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/all", authMiddleware, asyncHandler(getAllUsers));

export default userRoute;
