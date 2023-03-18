import express from "express";
import { register, login } from "../controllers/auth.js"

const router = express.Router();

router.post("/sign-up", register)
router.post("/login", login)


export default router;

