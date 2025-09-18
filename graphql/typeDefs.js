const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
  }

  type Pokemon {
    id: Int!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    pokedex: [Pokemon!]!
  }

  type Mutation {
    registerUser(username: String!, password: String!): User!
    loginUser(username: String!, password: String!): AuthPayload!
    addPokemonToPokedex(pokemonId: Int!): String
    removePokemonFromPokedex(pokemonId: Int!): String
  }
`;
