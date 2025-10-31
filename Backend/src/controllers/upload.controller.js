import { uploadToCloudinary } from "../utils/cloudinary.js";

import ApiError from "../utils/ApiError.js";
import fs from "fs";
import { ApiResponse } from "../utils/ApiResponse.js";

export const uploadImage = async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("File:", req.file);

    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const result = await uploadToCloudinary(req.file.path, "chatter");

    // Delete temp file
    fs.unlinkSync(req.file.path);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { url: result.secure_url }, "Upload successful")
      );
  } catch (error) {
    console.error("Upload error:", error);

    // Clean up temp file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    throw new ApiError(500, error.message);
  }
};
