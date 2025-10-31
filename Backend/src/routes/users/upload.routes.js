import { Router } from "express";
import { uploadSingle } from "../../middlewares/multer.middleware.js";
import { uploadImage } from "../../controllers/upload.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const uploadRoute = Router();

uploadRoute.post("/image", uploadSingle("image"), asyncHandler(uploadImage));

export default uploadRoute;
