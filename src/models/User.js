const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        owner: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: "user_id",
      through: "user_products",
      as: "products",
    });
  }
}

module.exports = User;
