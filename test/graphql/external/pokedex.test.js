const request = require('supertest')
const { expect } = require('chai')
let data = require('../fixtures/pokedex.json')
require('dotenv').config();

describe('Pokédex - GraphQL', () => {
    before(async () => {
        const resposta = await request(process.env.GRAPHQL_BASE_URL)
            .post('')
            .send({
                query: `
                    mutation LoginUser($username: String!, $password: String!) {
                        loginUser(username: $username, password: $password) {
                            token
                        }
                    }
                `,
                variables: data.user
            })
            
        expect(resposta.status).to.equal(200)
        token = resposta.body.data.loginUser.token
    })

    it('deve registrar um pokémon na pokédex com sucesso', async () => {
        const resposta = await request(process.env.GRAPHQL_BASE_URL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({                 
                query: `
                    mutation AddPokemonToPokedex($pokemonId: Int!) {
                        addPokemonToPokedex(pokemonId: $pokemonId)
                    }
                `,
                variables: data.pokemon 
            })

        expect(resposta.status).to.equal(200)
        expect(resposta.body.data.addPokemonToPokedex).to.deep.equal('Pokémon registrado na pokedex')
    })
})