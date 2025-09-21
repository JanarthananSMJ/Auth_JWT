import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDb from "./helper/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const { PORT } = process.env;
await connectDb();
const app = express();
const port = PORT || 4000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
