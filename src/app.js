import express from "express";
import cors from "cors";
import morgan from "morgan";

// import routes
import infoRouter from "./routes/info.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postsRouter from "./routes/post.routes.js";

// error
import handleErrors from "./middlewares/handleErrors.js";

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", infoRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postsRouter);

// error
app.use(handleErrors);

// exports
export default app;
