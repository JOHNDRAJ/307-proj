import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
  },
  grade: {
    type: String,
    required: false,
    maxLength: 30,
    default: "",
  },
  major: {
    type: String,
    required: false,
    maxLength: 30,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    maxLength: 150,
    default: "",
  },
  classes: {
    type: String,
    required: false,
    maxLength: 150,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
