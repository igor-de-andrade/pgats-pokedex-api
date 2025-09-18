const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// Registro de usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }
  try {
    const user = await userService.registerUser(username, password);
    if (!user) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  }
  try {
    const user = await userService.authenticate(username, password);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = userService.generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

// Listar usuários
router.get('/', (req, res) => {
  res.json(userService.getAllUsers());
});

module.exports = router;
