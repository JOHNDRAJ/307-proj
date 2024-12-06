import express from "express";
import {
  addUser,
  createChannel,
  updateChannelName,
  getChannels,
  getUsers,
} from "../controllers/channelControllers.js";

const router = express.Router();

router.put("/updateName", updateChannelName);

router.put("/addUser", addUser);

router.post("/create", createChannel);

router.get("/", getChannels);

router.get("/:channelId", getUsers);

export default router;
