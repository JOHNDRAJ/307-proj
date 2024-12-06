import express from "express";
import {
  updateProfile,
  getUser,
  getAllUsers,
  getUserByID,
} from "../controllers/profileControllers.js";

const router = express.Router();

router.put("/profile", updateProfile);

router.get("/allusers", getAllUsers);

router.get("/user", getUser);

router.get("/id/:userId", getUserByID);

export default router;
