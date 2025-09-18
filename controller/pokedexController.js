const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const pokedexService = require('../service/pokedexService');
const auth = require('./authMiddleware');

// Registrar Pokémon na pokedex
router.post('/register', auth, (req, res) => {
  const { pokemonId } = req.body;
  if (!pokemonId) return res.status(400).json({ error: 'pokemonId obrigatório' });
  const result = pokedexService.addPokemonToPokedex(req.user.username, pokemonId);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json({ message: 'Pokémon registrado na pokedex' });
});

// Listar pokémons da pokedex do usuário
router.get('/', auth, (req, res) => {
  const pokedex = pokedexService.getUserPokedex(req.user.username);
  res.json(pokedex);
});

// Remover Pokémon da pokedex do usuário
router.delete('/remove', auth, (req, res) => {
  const { pokemonId } = req.body;
  if (!pokemonId) return res.status(400).json({ error: 'pokemonId obrigatório' });
  const result = pokedexService.removePokemonFromPokedex(req.user.username, pokemonId);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json({ message: 'Pokémon removido da pokedex' });
});

module.exports = router;
