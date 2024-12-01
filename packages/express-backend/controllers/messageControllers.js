import Channel from "../models/channel.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Cxu from "../models/channelxuser.js";
import { authenticateToken } from "../tokenAuth.js";

export const sendMessage = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    const { contents, channelId } = req.body;
    try {
      const u = await User.findById(userId);
      if (!u) {
        return res.status(404).json({ message: "User not found, Message" });
      }
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found, Message" });
      }
      const recentMessage = new Message({ contents, sender: userId });
      await recentMessage.save();
      channel.messages.push(recentMessage);
      const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        {
          $set: { recentMessage: recentMessage },
        },
      );
      //channel.recentMessage = recentMessage;
      channel.recentTimestamp = Date.now();
      await channel.save();
      res.status(201).json({ message: "Message sent successfully", channel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

//update recentTimestamp
export const updateMessage = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    const { contents, messageId } = req.body;
    try {
      const message = await Message.findById(messageId);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      if (message.sender != userId) {
        console.log("Sender != user: ", message.sender, " | ", userId);
        return res.status(401).json({
          message: "Access Denied. you are not allowed to edit this message.",
        });
      }
      message.contents = contents;
      await message.save();
      res
        .status(200)
        .json({ message: "Message updated successfully", channel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const getMessages = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    const { channelId } = req.params;
    try {
      const cxu = await Cxu.findOne({ channel: channelId, user: userId });
      if (!cxu) {
        return res.status(401).json({
          message: "Access Denied. you are not a member of this channel.",
        });
      }
      const channel = await Channel.findById(channelId).populate("messages");
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const messages = await Message.find({ _id: { $in: channel.messages } });
      res
        .status(200)
        .json({ message: "Messages retrieved successfully", messages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const getMessage = [
  authenticateToken,
  async (req, res) => {
    const {messageId} = req.params;
    console.log("debug message:", messageId)
    try {
      const userMessage = await Message.findById(messageId);
      if (!userMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json({ message: "Message retrieved successfully", userMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];
