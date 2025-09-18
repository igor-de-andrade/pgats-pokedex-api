const request = require('supertest');
const { expect } = require('chai');
let data = require('../fixtures/user.json')
require('dotenv').config();

describe('/users/register - REST', () => {
    it('deve registrar um usuário com sucesso', async () => {
        const resposta = await request(process.env.REST_BASE_URL)
            .post('/users/register')
            .send(data.brock)

        expect(resposta.status).to.equal(201)
        expect(resposta.body).to.have.deep.equal({ message: 'Usuário registrado com sucesso' })
    })

})