import db from '../db';

export const getBooks = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = `
      SELECT *
      FROM "Books"
      WHERE user_id = $1
    `;
    const result = await db.query(query, [userId]);
    const books = result.rows;
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error('Error in getBooks function:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch books', error: error.message });
  }
};
