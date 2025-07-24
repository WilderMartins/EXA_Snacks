const { Router } = require('express');
const ConsumptionController = require('../controllers/ConsumptionController');
const authMiddleware = require('../middlewares/auth');

const consumptionsRouter = Router();

consumptionsRouter.use(authMiddleware);

consumptionsRouter.post('/', ConsumptionController.store);

module.exports = consumptionsRouter;
