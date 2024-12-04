import express from "express";
import {
  sendMessage,
  getMessages,
  updateMessage,
  getMessage,
  deleteMessage,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.post("/send", sendMessage);

router.put("/update", updateMessage);

router.get("/:channelId", getMessages);

router.get("/text/:messageId", getMessage);

router.delete("/del", deleteMessage);

export default router;
