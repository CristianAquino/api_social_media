dotenv.config();
import dotenv from "dotenv";
import mongoose from "mongoose";

const { DATA_BASE_URI } = process.env;

const database = mongoose
  .connect(DATA_BASE_URI)
  .then(() => console.log("conectado"))
  .catch((error) => console.log(error));

export default database;
