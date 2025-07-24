const { Model, DataTypes } = require('sequelize');

class Consumption extends Model {
  static init(sequelize) {
    super.init(
      {
        credits_used: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

module.exports = Consumption;
