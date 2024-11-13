import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const updateProfile = async (req, res) => {
    const {input, userId} = req.body
    console.log("Received updates:", input);
    try {
        const user = await User.findById(userId);
        console.log(userId)
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
}