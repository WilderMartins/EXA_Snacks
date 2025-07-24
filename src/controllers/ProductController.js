const Product = require('../models/Product');

class ProductController {
  async store(req, res) {
    const { barcode } = req.body;

    if (await Product.findOne({ where: { barcode } })) {
      return res.status(400).json({ error: 'Product already exists' });
    }

    const product = await Product.create(req.body);

    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    const updatedProduct = await product.update(req.body);

    return res.json(updatedProduct);
  }

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Product.destroy({ where: { id } });

    return res.status(204).send();
  }
}

module.exports = new ProductController();
