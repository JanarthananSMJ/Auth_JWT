import express from "express";
import loginData from "../controller/login.js";

const router = express.Router();

router.post("/login", loginData);

export default router;
