import express from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import { updateProfile } from "../controllers/profileControllers.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

export default router;
