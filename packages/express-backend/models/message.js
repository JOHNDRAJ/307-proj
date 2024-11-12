import mongoose from "mongoose";
import User from "./user";
import Channel from "./channel";

const messageSchema = mongoose.Schema({
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
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
});

export default mongoose.model("Message", messageSchema);
