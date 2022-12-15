import userModel from "../models/User.js";

// get a User
export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.id, { password: 0 });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// get all posts not include my
export const getAllUser = async (req, res, next) => {
  try {
    const post = await userModel.find({}, { password: 0 });
    return res.status(200).json(
      post.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    next(error);
  }
};

// update a User
export const updateUser = async (req, res, next) => {
  const { body } = req;

  if (body.password) {
    body.password = await userModel.encryptPassword(body.password);
  }

  try {
    const update = await userModel.findByIdAndUpdate(req.id, body, {
      new: true,
      select: { password: 0 }, // para elegir que devolver
    });
    return res.status(202).json(update);
  } catch (error) {
    next(error);
  }
};

// delete account
export const deleteAccount = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.id);
    return res.status(404).json({ message: "delete account" });
  } catch (error) {
    next(error);
  }
};

// follow and unfollow user
export const followUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const follow = await userModel.findById(id);
    const following = await userModel.findById(req.id);
    if (!follow.followers.includes(req.id)) {
      await follow.updateOne({ $push: { followers: req.id } });
      await following.updateOne({ $push: { following: id } });
      return res.status(200).json({ message: "user followed!" });
    } else {
      await follow.updateOne({ $pull: { followers: req.id } });
      await following.updateOne({ $pull: { following: id } });
      return res.status(200).json({ message: "user unfollowed!" });
    }
  } catch (error) {
    next(error);
  }
};
