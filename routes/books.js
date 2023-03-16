import express from "express";
import { getBook } from "../controllers/book.js"

const router = express.Router();



router.get("/test", getBook)

export default router;