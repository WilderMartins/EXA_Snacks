const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.post('/', adminMiddleware, UserController.store);
usersRouter.put('/', UserController.update);
usersRouter.get('/', adminMiddleware, UserController.index);
usersRouter.delete('/:id', adminMiddleware, UserController.delete);

module.exports = usersRouter;
