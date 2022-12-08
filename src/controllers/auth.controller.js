import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_WORD } = process.env;

// register new user
export const registerUser = async (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;
  const newUser = new userModel({
    username,
    firstname,
    lastname,
    password: await userModel.encryptPassword(password),
  });

  try {
    const savedUser = await newUser.save();
    const userForToken = {
      id: savedUser._id,
      username: savedUser.username,
    };
    const token = jwt.sign(userForToken, SECRET_WORD, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userFound = await userModel.findOne({ username });
    const matchPassword =
      userFound == null
        ? false
        : await userModel.comparePassword(password, userFound.password);

    if (!(userFound && matchPassword))
      return res.status(401).json({ message: "password or username invalid" });

    const userForToken = {
      id: userFound._id,
      username: userFound.username,
    };
    const token = jwt.sign(userForToken, SECRET_WORD, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
