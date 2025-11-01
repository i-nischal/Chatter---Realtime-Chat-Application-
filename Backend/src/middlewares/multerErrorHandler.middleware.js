const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    console.error("Multer error:", err);

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "File size too large. Maximum size is 5MB",
        data: null,
      });
    }

    if (err.message.includes("Only image files")) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: err.message,
        data: null,
      });
    }

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message || "File upload failed",
      data: null,
    });
  }
  next();
};

export default multerErrorHandler;
