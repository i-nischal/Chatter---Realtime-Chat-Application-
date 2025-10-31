import { Router } from "express";
import upload from "../../middlewares/multer.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadImage } from "../../controllers/upload.controller.js";

const uploadRoute = Router();

// Use Multer directly
uploadRoute.post("/image", upload.single("image"), asyncHandler(uploadImage));

export default uploadRoute;
