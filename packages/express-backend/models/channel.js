import mongoose from "mongoose";
import Message from "./message";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  recentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: false, //assuming false because a blank channel will have no messages
  },
  //recentTimestamp field will just be updated whenever recentMessage is updated
  recentTimestamp: {
    type: Date,
    required: true,
    default: Date.now, //i think that this should just set the timestamp to the channel creation date if there are no messages
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export default mongoose.model("Channel", channelSchema);
