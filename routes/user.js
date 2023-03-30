import express from "express";
import { getUser } from "../controllers/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();



router.get("/", authMiddleware, getUser);



export default router;
