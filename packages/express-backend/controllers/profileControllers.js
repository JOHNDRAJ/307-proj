import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body


    console.log("Received updates:", updates);

    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // console.log("User:", user);


        // if (updates.email) user.email = updates.email;
        // if (updates.password) {
        //   const salt = await bcrypt.genSalt(10);
        //   user.password = await bcrypt.hash(updates.password, salt);
        // }
        if (updates.grade) user.grade = updates.grade;
        if (updates.major) user.major = updates.major;
        if (updates.bio) user.bio = updates.bio;
        if (updates.classes) user.classes = updates.classes;
        
        await user.save();
        res.json({ message: "Profile updated successfully", user });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
}