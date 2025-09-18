const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const pokedexController = require('./controller/pokedexController');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userController);
app.use('/pokedex', pokedexController);

module.exports = app;
