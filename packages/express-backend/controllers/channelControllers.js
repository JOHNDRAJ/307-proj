import Channel from "../models/channel.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Cxu from "../models/channelxuser.js";
import { authenticateToken } from "../tokenAuth.js";

export const updateChannelName = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    const { name, channelId } = req.body;
    console.log("Received name:", name);
    try {
      const cxu = await Cxu.findOne({ channel: channelId, user: userId });
      if (!cxu) {
        return res.status(401).json({
          message: "Access Denied. you are not a member of this channel.",
        });
      }
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
      channel.name = name;
      await channel.save();
      res.status(200).json({ message: "Channel updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const addUser = [
  authenticateToken,
  async (req, res) => {
    const user = req.user._id;
    const { userId, channelId } = req.body;
    try {
      const cxu = await Cxu.findOne({ channel: channelId, user: user });
      if (!cxu) {
        return res.status(401).json({
          message: "Access Denied. you are not a member of this channel.",
        });
      }
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
      if (!(await User.findById(userId))) {
        return res.status(404).json({ message: "User not found, Cxu" });
      }
      const channelxUser = new Cxu({ user: userId, channel });
      channelxUser.save();
      res
        .status(200)
        .json({ message: "Channel updated successfully", channel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const createChannel = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    let { name, contents = null, users } = req.body;
    if (contents === "") {
      contents = null;
    }
    try {
      const u = await User.findById(userId);
      if (!u) {
        return res.status(404).json({ message: "User not found, Message" });
      }
      if (contents) {
        const recentMessage = new Message({ contents, sender: userId });
        await recentMessage.save();
      }
      const channel = new Channel({
        name,
        ...(contents && { recentMessage }), // Include recentMessage only if contents is truthy
        messages: contents ? [recentMessage] : [], // Add recentMessage to messages only if contents is valid
      });
      await channel.save();

      const channelxUserForRequester = new Cxu({ 
        user: userId, 
        channel: channel._id });
      await channelxUserForRequester.save();

      for (const user of users) {
        if (!(await User.findById(user))) {
          return res.status(404).json({ message: "User not found, Cxu" });
        }
        const channelxUser = new Cxu({ user, channel });
        await channelxUser.save();
      }

      res
        .status(201)
        .json({ message: "Channel created successfully", channel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const getChannels = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    try {
      const u = await User.findById(userId);
      if (!u) {
        return res.status(404).json({ message: "User not found" });
      }
      const cxus = await Cxu.find({ user: userId }).populate("channel");
      if (!cxus || cxus.length === 0) {
        return res
          .status(404)
          .json({ message: "No Cxu objects found for this user" });
      }
      res
        .status(200)
        .json({ message: "Cxu objects retrieved successfully", cxus });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const getUsers = [
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
      const c = await User.findById(channelId);
      if (!c) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const cxus = await Cxu.find({ channel: channelId }).populate("user");
      if (!cxus || cxus.length === 0) {
        return res
          .status(404)
          .json({ message: "No Cxu objects found for this channel" });
      }
      res
        .status(200)
        .json({ message: "Cxu objects retrieved successfully", cxus });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];
