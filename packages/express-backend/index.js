import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import messageRoutes from "./routes/messageRouter.js";
import cors from "cors";

dotenv.config();

const app = express();

let corsOptions = {
  origin: [
    "http://localhost:5001",
    "https://blue-mushroom-09a68691e.5.azurestaticapps.net/",
  ],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5001;

console.log(connection_string);

mongoose
  .connect(connection_string)
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.log("MongoDB connection failed:", error));

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/channel", channelRoutes);

app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to our messaging app...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
