const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

module.exports = function authenticate(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return {};
  try {
    const user = jwt.verify(token, SECRET);
    return { user };
  } catch {
    return {};
  }
};
