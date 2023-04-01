import express from "express";
import { User, Book, sequelize } from "../db.js";
import {
  getBooks,
  addBookToUnreadList,
  addBookToReadList,
} from "../controllers/books.js";

const router = express.Router();

const getSavedBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    const [unreadBooks, readBooks] = await Promise.allSettled([
      Book.findAll({ where: { user_id: userId, status: "unread" } }),
      Book.findAll({ where: { user_id: userId, status: "read" } }),
    ]);

    
    if (unreadBooks.status === 'fulfilled' && readBooks.status === 'fulfilled') {
      res.status(200).json({ unreadBooks: unreadBooks.value, readBooks: readBooks.value });
    }
  } catch (error) {
    console.error("Error fetching saved books:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching saved books." });
  }
};

router.get("/:userId/saved", getSavedBooks);
router.get("/", getBooks);
router.post("/:userId/unread", addBookToUnreadList);
router.post("/:userId/read", addBookToReadList);

export default router;
