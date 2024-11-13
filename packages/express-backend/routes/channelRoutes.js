import express from "express";
import { addUser, createChannel, updateChannelName } from "../controllers/channelControllers.js";

const router = express.Router();

//curl -X POST http://localhost:5001/api/channel/updateName -H "Content-Type: application/json" -d '{ "name": "GroupChat1", "channelId": "6734088eb0718583f8c3c531"}'
router.put("/updateName", updateChannelName);

//curl -X POST http://localhost:5001/api/channel/updateName -H "Content-Type: application/json" -d '{ "userId": "67339cda1b13d5f12cb6c654", "channelId": "6734088eb0718583f8c3c531"}'
router.put("/addUser", addUser);

//curl -X POST http://localhost:5001/api/channel/create -H "Content-Type: application/json" -d '{"name": "test", "contents": "Hello World!", "users": ["67339cda1b13d5f12cb6c654", "6733f8114d0ece415fa4ef68"], "userId": "67339cda1b13d5f12cb6c654"}'
router.post("/create", createChannel);

export default router;