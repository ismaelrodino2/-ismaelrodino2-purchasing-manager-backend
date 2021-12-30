const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Product = require("../models/Product");
const AdmUser = require("../models/AdmUser");

const connection = new Sequelize(dbConfig);

User.init(connection);
Product.init(connection);
AdmUser.init(connection);

Product.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
