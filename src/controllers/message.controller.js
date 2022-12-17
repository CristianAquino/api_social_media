import messageModel from "../models/Message.js";

// create addMessage
export const addMessage = async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get message
export const getMessage = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
