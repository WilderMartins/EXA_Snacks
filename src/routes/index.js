const { Router } = require('express');

const sessionsRouter = require('./sessions.routes');
const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');
const consumptionsRouter = require('./consumptions.routes');
const settingsRouter = require('./settings.routes');
const setupRouter = require('./setup.routes');
const categoriesRouter = require('./categories.routes');

const routes = Router();

routes.use('/setup', setupRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/consumptions', consumptionsRouter);
routes.use('/settings', settingsRouter);
routes.use('/categories', categoriesRouter);

module.exports = routes;
