import express from "express";
import { sendMessage } from "../controllers/messageControllers.js";

const router = express.Router();

// curl -X POST http://localhost:5001/api/message/send -H "Content-Type: application/json" -d '{ "contents": "Hello Again World!", "channelId": "6734088eb0718583f8c3c531", "userId": "67339cda1b13d5f12cb6c654"}'
router.post("/send", sendMessage);

// curl -X POST http://localhost:5001/api/message/send -H "Content-Type: application/json" -d '{ "contents": "Hello Again World!", "messageId": "XXXXXXXXXXXXXX"}'
router.put("/update", sendMessage);

export default router;