const { Router } = require('express');
const SessionController = require('../controllers/SessionController');

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

module.exports = sessionsRouter;
