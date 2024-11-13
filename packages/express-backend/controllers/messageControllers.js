import Channel from "../models/channel.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Cxu from "../models/channelxuser.js";

export const sendMessage = async (req, res) => {
    const {contents, channelId, userId} = req.body;
    try {
        const u = await User.findById(userId);
        if (!u) {
          return res.status(404).json({ message: "User not found, Message" });
        }
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return res.status(404).json({ message: "Channel not found, Message" });
        }
        const recentMessage = new Message({contents, sender: userId})
        await recentMessage.save();
        channel.messages.push(recentMessage);
        channel.recentMessage = recentMessage
        channel.recentTimestamp = Date.now()
        await channel.save();
        res.status(201).json({ message: "Message sent successfully", channel});
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  }


  //update recentTimestamp
  export const updateMessage = async (req, res) => {
    const {contents, messageId} = req.body;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
          return res.status(404).json({ message: "Message not found" });
        }
        message.contents = contents
        await message.save();
        res.status(200).json({ message: "Message updated successfully", channel});
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  }