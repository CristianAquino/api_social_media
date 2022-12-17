import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

// import routes
import infoRouter from "./routes/info.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postsRouter from "./routes/post.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

// error
import handleErrors from "./middlewares/handleErrors.js";

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api", infoRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// error
app.use(handleErrors);

// exports
export default app;
