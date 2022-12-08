import app from "./app.js";
import dotenv from "dotenv";
import database from "./database.js";

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`run server in : http://localhost:${PORT}`));
