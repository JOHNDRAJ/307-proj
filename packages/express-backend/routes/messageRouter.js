import express from "express";
import {
  sendMessage,
  getMessages,
  updateMessage,
} from "../controllers/messageControllers.js";

const router = express.Router();

// curl -X POST http://localhost:5001/api/message/send -H "Content-Type: application/json" -d '{ "contents": "Hello Again World!", "channelId": "XXXXXXXXXXXXXX", "userId": "XXXXXXXXXXXXXX"}'
router.post("/send", sendMessage);

// curl -X POST http://localhost:5001/api/message/send -H "Content-Type: application/json" -d '{ "contents": "Hello Again World!", "messageId": "XXXXXXXXXXXXXX"}'
router.put("/update", updateMessage);

//curl -X GET http://localhost:5001/api/message/XXXXXXXXXX
router.get("/:channelId", getMessages);

export default router;
