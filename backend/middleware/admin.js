const roleMiddleware = (Role) => (req, res, next) => {
    if (req.user.role !== Role) {
      return res.status(403).send('Access denied. Insufficient permissions.');
    }
    next();
  };
  
  module.exports = roleMiddleware;
  