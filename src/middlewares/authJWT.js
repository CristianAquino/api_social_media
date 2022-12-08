import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import userModel from "../models/User.js";

dotenv.config();
const { SECRET_WORD } = process.env;

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.toLowerCase().startsWith("bearer"))
    return res.status(404).json({ message: "token not send" });

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, SECRET_WORD);
    req.id = decode.id;
  } catch (error) {
    return next(error);
  }

  const user = await userModel.findById(req.id, { password: 0 });

  if (!user) return res.status(404).json({ message: "user invalid" });

  next();
};
