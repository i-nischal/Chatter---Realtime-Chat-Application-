import upload from "./multer.middleware.js";
import multerErrorHandler from "./multerErrorHandler.middleware.js";

const fileUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return multerErrorHandler(err, req, res, next);
    }
    next();
  });
};

export default fileUpload;