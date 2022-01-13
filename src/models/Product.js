const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        number: DataTypes.INTEGER,
        price: DataTypes.REAL,
        owner: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "product_id",
      through: "user-products",
      as: "users",
    });
  }
}

module.exports = Product;
