import express from "express";
import { updateProfile, getUser, getAllUsers, getUserByID } from "../controllers/profileControllers.js";

const router = express.Router();

router.put("/profile", updateProfile);

router.get("/allusers", getAllUsers);

// curl -X GET http://localhost:5001/api/user/67339cda1b13d5f12cb6c654  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzMzOWNkYTFiMTNkNWYxMmNiNmM2NTQiLCJpYXQiOjE3MzE1MjYxMjMsImV4cCI6MTczMTUyOTcyM30.eNUo65jswR1XtAob80Zqwl-ai06GsktLDCearXUM32I"
//
router.get("/user", getUser);

router.get("/id/:userId", getUserByID);


export default router;
