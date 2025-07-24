const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: {
          type: DataTypes.VIRTUAL,
          allowNull: false,
        },
        password_hash: DataTypes.STRING,
        daily_credits: DataTypes.INTEGER,
        role: DataTypes.ENUM('admin', 'user'),
        is_active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Consumption, { foreignKey: 'user_id', as: 'consumptions' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
