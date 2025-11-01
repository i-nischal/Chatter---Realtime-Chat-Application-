import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadImage } from "../../controllers/upload.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import fileUpload from "../../middlewares/fileUpload.middleware.js";

const uploadRoute = Router();

uploadRoute.post(
  "/image",
  authMiddleware,
  fileUpload,
  asyncHandler(uploadImage)
);

//update profile
uploadRoute.put(
  "/update-profile",
  authMiddleware,
  fileUpload,
  asyncHandler(uploadImage)
);
export default uploadRoute;
