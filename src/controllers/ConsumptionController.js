const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns');
const User = require('../models/User');
const Product = require('../models/Product');
const Consumption = require('../models/Consumption');

class ConsumptionController {
  async store(req, res) {
    const { barcode } = req.body;
    const userId = req.userId;

    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    const user = await User.findByPk(userId, {
      include: { association: 'consumptions' },
    });

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const dailyConsumptions = await Consumption.findAll({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    if (dailyConsumptions.length >= user.daily_credits) {
      return res.status(403).json({ error: 'Daily credit limit reached' });
    }

    const consumption = await Consumption.create({
      user_id: userId,
      product_id: product.id,
    });

    return res.json(consumption);
  }
}

module.exports = new ConsumptionController();
