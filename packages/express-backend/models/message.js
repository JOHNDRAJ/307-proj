import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  contents: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 512,
  },
  image: {
    type: Boolean,
    required: true,
    default: false,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
