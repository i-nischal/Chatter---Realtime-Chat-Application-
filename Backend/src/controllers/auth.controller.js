import User from "../models/user.model.js";
import generateTokens from "../utils/generateTokens.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All Fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with provided email");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const token = generateTokens(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: newUser.toResponse() },
        "Registration Successful"
      )
    );
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(404, "User Not Found");
  }

  // Compare password
  const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateTokens(existingUser._id);

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    })
    .json(
      new ApiResponse(
        200,
        {
          user: existingUser.toResponse(),
        },
        "Login Successful"
      )
    );
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, {}, "Logout Successful"));
};

export const getCurrrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  res.status(200).json(new ApiResponse(200, { user: user.toResponse() }));
};
