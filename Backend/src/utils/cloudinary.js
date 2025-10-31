import cloudinary from "../configs/cloudinary.js";

export const uploadToCloudinary = async (filePath, folder = 'chatter') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
};