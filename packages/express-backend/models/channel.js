import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  recentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: false,
  },
  recentTimestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
