const roleMiddleware = () => (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Access denied. Insufficient permissions.');
    }
    next();
  };
  
  module.exports = roleMiddleware;
  