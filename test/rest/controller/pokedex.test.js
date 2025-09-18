const request = require('supertest')
const { expect } = require('chai')
const sinon = require("sinon")
let data = require('../fixtures/pokedex.json')

const jwt = require('jsonwebtoken')
const app = require("../../../app")

const pokedexService = require("../../../service/pokedexService")

describe('/pokedex/register', () => {

    afterEach(() => {
        sinon.restore()
    })

    it('não deve registrar um pokémon duplicado', async () => {
        const pokedexServiceMock = sinon.stub(pokedexService, 'addPokemonToPokedex')
        pokedexServiceMock.returns({ error: 'Pokémon já registrado' })

        sinon.stub(jwt, 'verify').returns({ username: 'ash' })

        const resposta = await request(app)
            .post('/pokedex/register')
            .set('Authorization', 'Bearer fakeToken')
            .send(data.pokemon)

        expect(resposta.status).to.equal(400)
        expect(resposta.body).to.deep.equal({ error: 'Pokémon já registrado'})
    })


})