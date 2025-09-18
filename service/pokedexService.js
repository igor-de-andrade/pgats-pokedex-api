function removePokemonFromPokedex(username, pokemonId) {
  if (!pokedexDb[username]) return { error: 'Usuário não possui pokédex' };
  const index = pokedexDb[username].indexOf(pokemonId);
  if (index === -1) return { error: 'Pokémon não encontrado na pokédex' };
  pokedexDb[username].splice(index, 1);
  return { success: true };
}
const pokedexDb = require('../model/pokedexModel');
const pokemonList = require('../model/pokemonList');

function addPokemonToPokedex(username, pokemonId) {
  if (!pokedexDb[username]) pokedexDb[username] = [];
  if (pokedexDb[username].includes(pokemonId)) return { error: 'Pokémon já registrado' };
  const exists = pokemonList.some(p => p.id === pokemonId);
  if (!exists) return { error: 'Pokémon inexistente' };
  pokedexDb[username].push(pokemonId);
  return { success: true };
}

function getUserPokedex(username) {
  if (!pokedexDb[username]) return [];
  return pokedexDb[username].map(id => pokemonList.find(p => p.id === id));
}

module.exports = {
  addPokemonToPokedex,
  getUserPokedex,
  removePokemonFromPokedex
};
