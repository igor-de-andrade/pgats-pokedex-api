const request = require('supertest')
const { expect } = require('chai')
const sinon = require("sinon")

const app = require("../../../app")
const userService = require("../../../service/userService")
let data = require('../fixtures/user.json')


describe('/users/register', () => {

    afterEach(() => {
        sinon.restore()
    })

    it('não deve cadastrar um usuário duplicado', async () => {
        const userServiceMock = sinon.stub(userService, 'registerUser')
        userServiceMock.returns(null)

        const resposta = await request(app)
            .post('/users/register')
            .send(data.gary)

        expect(resposta.status).to.equal(409)
        expect(resposta.body).to.have.deep.equal({ error: 'Usuário já existe' })
    })

})