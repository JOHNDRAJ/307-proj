import mongoose from "mongoose";

const CxuSchema = new mongoose.Schema({
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

const Cxu = mongoose.model("Cxu", CxuSchema);

export default Cxu;
