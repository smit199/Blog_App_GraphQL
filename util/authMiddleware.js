const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || '';
  if(!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
  catch(err) {
    throw new Error('Invalid token');
  }
}

module.exports = authMiddleware