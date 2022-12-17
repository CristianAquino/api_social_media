import chatModel from "../models/Chat.js";

// post chat
export const createChat = async (req, res, next) => {
  const { receiverId } = req.body;
  const newChat = new chatModel({
    members: [req.id, receiverId],
  });

  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get chat
export const userChats = async (req, res, next) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.id] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

// get /find/:firstId/:secondId
export const findChat = async (req, res, next) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
