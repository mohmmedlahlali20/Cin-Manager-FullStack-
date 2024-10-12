const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const generateToken = (user) => {
    const payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role 
    };

    return jwt.sign(payload, secret, {
        expiresIn: '1h',
    });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
