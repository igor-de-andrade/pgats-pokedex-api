// Banco de dados em memória
const bcrypt = require('bcryptjs');

const users = [
    {
        username: 'ash',
        password: bcrypt.hashSync('123456', 8),
    }
];

module.exports = users;
