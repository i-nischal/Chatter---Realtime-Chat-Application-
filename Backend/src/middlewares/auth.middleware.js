import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Access token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired");
    }
    if (err.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    }
    throw err;
  }

  const user = await User.findOne(decoded.email);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  req.user = user;
  next();
});


export default authMiddleware;
