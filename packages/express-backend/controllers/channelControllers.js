import Channel from "../models/channel.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Cxu from "../models/channelxuser.js";

export const updateChannelName = async (req, res) => {
    const {name, channelId} = req.body
    console.log("Received name:", name);
    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return res.status(404).json({ message: "Channel not found" });
        }
        channel.name = name
        await channel.save();
        res.status(200).json({ message: "Channel updated successfully", user });
      } catch (error) {
        res.status(500).json({ message: `Server error ${error}`, error });
      }
}

export const addUser = async (req, res) => {
    const {userId, channelId} = req.body
    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
          return res.status(404).json({ message: "Channel not found" });
        }
        if (!await User.findById(userId)) {
            return res.status(404).json({ message: "User not found, Cxu" });
        }
        const channelxUser = new Cxu({user: userId, channel})
        channelxUser.save()
        res.status(200).json({ message: "Channel updated successfully", channel});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Server error ${error}`, error });
      }
}


export const createChannel = async (req, res) => {
    const { name, contents, users, userId} = req.body;
    try {
        const u = await User.findById(userId);
        if (!u) {
          return res.status(404).json({ message: "User not found, Message" });
        }
        const recentMessage = new Message({contents, sender: userId})
        await recentMessage.save();
        const channel = new Channel({name, recentMessage, messages: [recentMessage]})
        await channel.save();
        for (const user of users) {
            if (!await User.findById(user)) {
                return res.status(404).json({ message: "User not found, Cxu" });
            }
            const channelxUser = new Cxu({user, channel})
            channelxUser.save()
        }
        res.status(201).json({ message: "Channel created successfully", channel});
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  }