const userService = require('../service/userService');
const pokedexService = require('../service/pokedexService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

module.exports = {
  Query: {
    users: () => userService.getAllUsers(),
    pokedex: (parent, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return pokedexService.getUserPokedex(context.user.username);
    },
  },
  Mutation: {
    registerUser: async (parent, { username, password }) => {
      const user = await userService.registerUser(username, password);
      if (!user) throw new Error('Usuário já existe');
      return user;
    },
    loginUser: async (parent, { username, password }) => {
      const user = await userService.authenticate(username, password);
      if (!user) throw new Error('Credenciais inválidas');
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    addPokemonToPokedex: (parent, { pokemonId }, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      const result = pokedexService.addPokemonToPokedex(context.user.username, pokemonId);
      if (result.error) throw new Error(result.error);
      return 'Pokémon registrado na pokedex';
    },
    removePokemonFromPokedex: (parent, { pokemonId }, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      const result = pokedexService.removePokemonFromPokedex(context.user.username, pokemonId);
      if (result.error) throw new Error(result.error);
      return 'Pokémon removido da pokedex';
    }
  }
};
