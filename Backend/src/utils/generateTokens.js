const generateTokens = (userId) => {
  if (!process.env.JWT_SECRET_TOKEN) {
    throw new Error("JWT_SECRET_TOKEN is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_SECRET_EXPIRY || "30d",
  });

  return token;
};

export default generateTokens;
