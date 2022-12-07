import mongoose from "mongoose";
import dotenv from "dotenv";

const { DATA_BASE_URI } = process.env;

dotenv.config();

mongoose
  .connect(DATA_BASE_URI)
  .then(() => console.log("conectado"))
  .catch((error) => console.error(error));
