import { signIn, signOut, signUp } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

export default router;
