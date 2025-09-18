const request = require('supertest')
const { expect } = require('chai')
let data = require('../fixtures/registerUser.json')
require('dotenv').config();

describe('registerUser - GraphQL', () => {
    it('deve registrar um usuário com sucesso', async () => {
        const resposta = await request(process.env.GRAPHQL_BASE_URL)
            .post('')
            .send({                 
                query: `
                    mutation RegisterUser($username: String!, $password: String!) {
                        registerUser(username: $username, password: $password) {
                            username
                        }
                    }
                `,
                variables: data.user 
            })

        expect(resposta.status).to.equal(200)
        expect(resposta.body.data.registerUser.username).to.deep.equal('professor_oak')
    })
})