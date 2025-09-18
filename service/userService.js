const users = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function findUser(username) {
  return users.find(u => u.username === username);
}

async function registerUser(username, password) {
  if (findUser(username)) return null;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
}

async function authenticate(username, password) {
  const user = findUser(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (match) return user;
  return null;
}

function getAllUsers() {
  return users.map(u => ({ username: u.username }));
}

// Funções de pokedex removidas. Agora estão em pokedexService.js

function generateToken(user) {
  // Use uma chave secreta forte em produção
  return jwt.sign({ username: user.username }, 'segredo_super_secreto', { expiresIn: '1h' });
}

module.exports = {
  findUser,
  registerUser,
  authenticate,
  getAllUsers,
  generateToken
};
