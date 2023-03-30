import { User } from '../db.js';

async function getUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    console.log(user)
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
}

export { getUser };
