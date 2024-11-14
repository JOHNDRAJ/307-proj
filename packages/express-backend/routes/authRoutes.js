import express from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import { updateProfile } from "../controllers/profileControllers.js";

const router = express.Router();

// curl -X POST http://localhost:5001/api/auth/signup \
// -H "Content-Type: application/json" \
// -d '{
//   "name": "Jane Smith",
//   "email": "jane@example.com",
//   "password": "anotherpassword"
// }'
router.post("/signup", signUp);

// curl -X POST http://localhost:5001/api/auth/signin \
// -H "Content-Type: application/json" \
// -d '{
//   "email": "jane@example.com",
//   "password": "anotherpassword"
// }'
router.post("/signin", signIn);

export default router;
