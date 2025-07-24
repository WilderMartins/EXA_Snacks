const Sequelize = require('sequelize');
const User = require('../models/User');
const Product = require('../models/Product');
const Consumption = require('../models/Consumption');

const databaseConfig = require('../config/database');

const models = [User, Product, Consumption];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
