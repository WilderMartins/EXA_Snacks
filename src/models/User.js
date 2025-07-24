const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        otp: DataTypes.STRING,
        otp_expires_at: DataTypes.DATE,
        daily_credits: DataTypes.INTEGER,
        role: DataTypes.ENUM('admin', 'user'),
        is_active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Consumption, { foreignKey: 'user_id', as: 'consumptions' });
  }
}

module.exports = User;
