const request = require('supertest')
const { expect } = require('chai')
let data = require('../fixtures/pokedex.json')
require('dotenv').config();

describe('/pokedex/register - REST', () => {
    before(async () => {
        const resposta = await request(process.env.REST_BASE_URL)
            .post('/users/login')
            .send(data.user)
            
        expect(resposta.status).to.equal(200)
        token = resposta.body.token
    })

    it('deve registrar um pokémon na pokédex com sucesso', async () => {
        const resposta = await request(process.env.REST_BASE_URL)
            .post('/pokedex/register')
            .set('Authorization', `Bearer ${token}`)
            .send(data.pokemon)

        expect(resposta.status).to.equal(201)
        expect(resposta.body).to.deep.equal({ message: 'Pokémon registrado na pokedex'})
    })


})