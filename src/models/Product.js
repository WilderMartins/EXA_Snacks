const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        barcode: DataTypes.STRING,
        image_url: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Consumption, { foreignKey: 'product_id', as: 'consumptions' });
  }
}

module.exports = Product;
