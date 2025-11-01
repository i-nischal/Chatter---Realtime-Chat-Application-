import { uploadToCloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import User from "../models/user.model.js";

export const uploadImage = async (req, res) => {
  let tempFilePath = null;

  try {
    // Check if file exists
    if (!req.file) {
      throw new ApiError(400, "No image file provided");
    }

    tempFilePath = req.file.path;
    console.log("Processing file:", {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(tempFilePath, "chatter");

    // Clean up temp file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    const userProfileImg = await User.findByIdAndUpdate(
      req.user._id,
      { profile: result.secure_url },
      { new: true }
    );

    if (!userProfileImg) {
      throw new ApiError(400, "Failed to update profile image");
    }

    // Return success response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userProfileImg.toResponse(),
          "Image uploaded successfully"
        )
      );
  } catch (error) {
    // Clean up temp file on error
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (unlinkError) {
        console.error("Failed to delete temp file:", unlinkError);
      }
    }

    console.error("Upload controller error:", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Image upload failed"
    );
  }
};
