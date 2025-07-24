const { Router } = require('express');

const sessionsRouter = require('./sessions.routes');
const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');
const consumptionsRouter = require('./consumptions.routes');

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/consumptions', consumptionsRouter);

module.exports = routes;
