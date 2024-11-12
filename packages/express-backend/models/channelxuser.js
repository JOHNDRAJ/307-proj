import mongoose from "mongoose";
import User from "./user";
import Channel from "./channel";

const messageSchema = mongoose.Schema({
  user: {
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
