import userModel from "../models/User.js";

export const checkDuplicateUsername = async (req, res, next) => {
  const { username } = req.body;
  const user = await userModel.findOne({ username });
  if (user)
    return res
      .status(400)
      .json({ message: `el username: ${username} ya existe` });

  next();
};
