import fs from "fs";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path, "chatter/profiles");

    // Delete temp file
    fs.unlinkSync(req.file.path);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          url: result.secure_url,
          publicId: result.public_id,
        },
        "Image uploaded successfully"
      )
    );
  } catch (error) {
    // Clean up temp file
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    throw new ApiError(500, error.message);
  }
};
