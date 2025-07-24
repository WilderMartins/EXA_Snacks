const { Router } = require('express');
const SettingsController = require('../controllers/SettingsController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const settingsRouter = Router();

settingsRouter.use(authMiddleware, adminMiddleware);

settingsRouter.get('/', SettingsController.show);
settingsRouter.post('/', SettingsController.store);

module.exports = settingsRouter;
