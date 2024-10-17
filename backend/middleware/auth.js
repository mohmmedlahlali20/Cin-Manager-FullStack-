const { verifyToken } = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Access denied.');
  }
  try {
    const decoded = verifyToken(token.split(' ')[1]);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Invalid token.');
  }
};

module.exports = authMiddleware;
