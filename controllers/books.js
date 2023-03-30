import { User, Book } from "../db.js"

export const getBooks = async (req, res) => {
  try {
    const { userId } = req.query;
    const books = await Book.findAll({ where: { user_id: userId } });
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error('Error in getBooks function:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch books', error: error.message });
  }
};




export const addBookToUnreadList = async (req, res) => {
  try {
    const { userId } = req.params;
    const book = req.body;
    console.log(book)
    await Book.create({
      user_id: userId,
      title: book.title,
      author: book.author,
      rating: book.rating,
      cover_photo: book.cover_photo,
      date_published: book.date_published,
      link_to_buy: book.link_to_buy,
      status: 'unread',
    });
    res.status(200).json({ success: true, message: "Book added to unread list" });
  } catch (error) {
    console.error("Error in addBookToUnreadList function:", error);
    res.status(500).json({ success: false, message: "Failed to add book to unread list", error: error.message });
  }
};

export const addBookToReadList = async (req, res) => {
  try {
    const { userId } = req.params;
    const book = req.body;
    await Book.create({
      user_id: userId,
      title: book.title,
      author: book.author,
      rating: book.rating,
      cover_photo: book.cover_photo,
      date_published: book.date_published,
      link_to_buy: book.link_to_buy,
      status: 'read',
    });
    res.status(200).json({ success: true, message: "Book added to read list" });
  } catch (error) {
    console.error("Error in addBookToReadList function:", error);
    res.status(500).json({ success: false, message: "Failed to add book to read list", error: error.message });
  }
};
