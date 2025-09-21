import express from "express";
import { loginData, registerData } from "../controller/auth.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginData);
router.post("/register", registerData);

export default router;
