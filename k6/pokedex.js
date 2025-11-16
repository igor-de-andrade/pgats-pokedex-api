// Implementação da atividade 2 da disciplina "Automação de Testes de Performance" da PGATS
import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
    vus: 10,
    duration: '20s',
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
    }
}

export function setup() {
    let responseLogin = http.post('http://localhost:3000/users/login',
        JSON.stringify({
            username: 'ash',
            password: '123456'
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    check(responseLogin, {
        '(login) status deve ser 200': (r) => r.status === 200
    })

    const token = responseLogin.json('token')
    return { token }
}

export default function (data) {
    let responsePokedex = http.get('http://localhost:3000/pokedex', {
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })

    check(responsePokedex, {
        '(pokedex) status deve ser 200': (r) => r.status === 200
    })

    sleep(1)
}