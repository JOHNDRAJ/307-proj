import mongoose from "mongoose";
import User from "./user.js";
import Channel from "./channel.js";

const messageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  contents: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message
