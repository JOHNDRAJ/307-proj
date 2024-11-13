import express from "express";
import { updateProfile } from "../controllers/profileControllers.js";

const router = express.Router();

router.put("/profile", updateProfile);

export default router;