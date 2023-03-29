import { verifyToken } from './jwtUtils.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authMiddleware;
