dotenv.config();
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadImage = async (path, folder) => {
  return await cloudinary.uploader.upload(path, {
    folder,
  });
};

export const deleteFolder = async (folderName) => {
  await cloudinary.api.delete_resources_by_prefix(`${folderName}/`);
  await cloudinary.api.delete_folder(folderName);
};

export const deleteImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
};
