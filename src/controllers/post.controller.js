import postModel from "../models/Post.js";
import { uploadImage, deleteFolder } from "../libs/cloudinary.js";

// create a post
export const createPost = async (req, res, next) => {
  const post = new postModel(req.body);

  try {
    post.userId = req.id;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// upload image
export const uploadPostImage = async (req, res, next) => {
  const image = req.files.file;
  const post = {};
  try {
    const upload = await uploadImage(image.tempFilePath, image.name);
    post.image = upload.url;
    post.imageId = upload.public_id.split("/")[0];
    return res.status(200).json({ image: post.image, imageId: post.imageId });
  } catch (error) {
    next(error);
  }
};

// get my posts
export const getPost = async (req, res, next) => {
  try {
    const post = await postModel.find({ userId: req.id });
    return res.status(200).json(
      post.sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      })
    );
  } catch (error) {
    next(error);
  }
};

// get all posts
export const getAllPost = async (req, res, next) => {
  try {
    const post = await postModel.find({ userId: { $ne: req.id } });
    return res.status(200).json(
      post.sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      })
    );
  } catch (error) {
    next(error);
  }
};

// update a post
export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { body } = req;
  try {
    const post = await postModel.findByIdAndUpdate(postId, body, { new: true });
    return res.status(202).json(post);
  } catch (error) {
    next(error);
  }
};

// delete a post
export const deletePost = async (req, res, next) => {
  const { postId, imageId } = req.params;
  try {
    await postModel.findByIdAndDelete(postId);
    await deleteFolder(imageId);
    return res.status(404).json({ message: "delete post" });
  } catch (error) {
    next(error);
  }
};

// like/dislike a post
export const likePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await postModel.findById(postId);
    if (!post.likes.includes(req.id)) {
      await post.updateOne({ $push: { likes: req.id } });
      return res.status(200).json({ message: "post like" });
    } else {
      await post.updateOne({ $pull: { likes: req.id } });
      return res.status(200).json({ message: "post dislike" });
    }
  } catch (error) {
    next(error);
  }
};
