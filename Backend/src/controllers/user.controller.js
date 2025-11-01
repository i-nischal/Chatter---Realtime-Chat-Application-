import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    return res.status(404).json(new ApiResponse("Users not Available"));
  }
  return res.status(200).json(new ApiResponse(200, users, "All user lists"));
};
