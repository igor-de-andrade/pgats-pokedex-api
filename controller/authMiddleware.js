const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não informado' });
  try {
    const decoded = jwt.verify(token, 'segredo_super_secreto');
    const user = userService.findUser(decoded.username);
    if (!user) return res.status(401).json({ error: 'Token inválido' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = auth;
