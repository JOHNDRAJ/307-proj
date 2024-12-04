import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../tokenAuth.js";

export const updateProfile = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    const { input } = req.body;
    console.log("Received updates:", input);
    try {
      const user = await User.findById(userId);
      console.log(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (input.grade) user.grade = input.grade;
      if (input.major) user.major = input.major;
      if (input.bio) user.bio = input.bio;
      if (input.classes) user.classes = input.classes;
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
];

export const getUser = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];

export const getAllUsers = [
  authenticateToken,
  async (req, res) => {
    const userId = req.user._id;
    try {
      const users = await User.find({ _id: { $ne: userId } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },
];

export const getUserByID = [
  authenticateToken,
  async (req, res) => {
    const { userId } = req.params;
    // console.log("debug message:", userId)
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Server error ${error}`, error });
    }
  },
];
