import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);

chatSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const chatModel = model("Chat", chatSchema);
export default chatModel;
