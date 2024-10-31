import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5001;

console.log(connection_string);

mongoose
  .connect(connection_string)
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.log("MongoDB connection failed:", error));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to our messaging app...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
