import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDb from "./config/db.js";

dotenv.config();
const { PORT } = process.env;
connectDb();
const app = express();
const port = PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
