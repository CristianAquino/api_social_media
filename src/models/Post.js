import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    desc: String,
    likes: [],
    image: String,
    imageId: String,
  },
  { timestamps: true, versionKey: false }
);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const postModel = model("Post", postSchema);
export default postModel;
