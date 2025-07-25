const { Op, fn, col, literal } = require('sequelize');
const { startOfDay, endOfDay, parseISO } = require('date-fns');
const User = require('../models/User');
const Product = require('../models/Product');
const Consumption = require('../models/Consumption');

class ConsumptionController {
  // ... (método store permanece o mesmo)
  async store(req, res) {
    const { barcode } = req.body;
    const userId = req.userId;

    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    const user = await User.findByPk(userId);

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const dailyConsumptions = await Consumption.count({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    if (dailyConsumptions >= user.daily_credits) {
      return res.status(403).json({ error: 'Daily credit limit reached' });
    }

    const consumption = await Consumption.create({
      user_id: userId,
      product_id: product.id,
    });

    const consumptionWithProduct = await Consumption.findByPk(consumption.id, { include: { model: Product, as: 'product' } });

    return res.status(201).json(consumptionWithProduct);
  }

  // ... (método index permanece o mesmo)
  async index(req, res) {
    const { user_id, start_date, end_date } = req.query;

    const where = {};

    if (user_id) {
      where.user_id = user_id;
    }

    if (start_date && end_date) {
      where.created_at = {
        [Op.between]: [parseISO(start_date), parseISO(end_date)],
      };
    }

    const consumptions = await Consumption.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Product, as: 'product', attributes: ['id', 'name', 'barcode'] },
      ],
      order: [['created_at', 'DESC']],
    });

    return res.json(consumptions);
  }

  async summaryByUser(req, res) {
    const summary = await Consumption.findAll({
      attributes: [
        [fn('COUNT', col('user.id')), 'total_consumed'],
      ],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      }],
      group: ['user.id', 'user.name'],
      order: [[literal('total_consumed'), 'DESC']],
      limit: 10,
    });
    return res.json(summary);
  }

  async summaryByProduct(req, res) {
    const summary = await Consumption.findAll({
      attributes: [
        [fn('COUNT', col('product.id')), 'total_consumed'],
      ],
      include: [{
        model: Product,
        as: 'product',
        attributes: ['id', 'name'],
      }],
      group: ['product.id', 'product.name'],
      order: [[literal('total_consumed'), 'DESC']],
    });
    return res.json(summary);
  }

  async summary(req, res) {
    // Daily consumption for the last 7 days
    const dailyConsumptions = await Consumption.findAll({
      attributes: [
        [fn('date_trunc', 'day', col('created_at')), 'date'],
        [fn('COUNT', 'id'), 'count'],
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      group: ['date'],
      order: [['date', 'ASC']],
    });

    // Consumption by product category
    const categoryConsumptions = await Consumption.findAll({
      attributes: [
        [fn('COUNT', 'product.id'), 'count'],
      ],
      include: [{
        model: Product,
        as: 'product',
        attributes: ['category'],
      }],
      group: ['product.category'],
    });

    return res.json({
      dailyConsumptions,
      categoryConsumptions,
    });
  }
}

module.exports = new ConsumptionController();
