const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const productsRouter = Router();

productsRouter.use(authMiddleware);

productsRouter.post('/', adminMiddleware, ProductController.store);
productsRouter.put('/:id', adminMiddleware, ProductController.update);
productsRouter.get('/', ProductController.index);
productsRouter.delete('/:id', adminMiddleware, ProductController.delete);

module.exports = productsRouter;
