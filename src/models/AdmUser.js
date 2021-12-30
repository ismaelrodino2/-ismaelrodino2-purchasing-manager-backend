const { Model, DataTypes } = require("sequelize");

class AdmUser extends Model {
  static init(sequelize) {
    super.init(
      {
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = AdmUser;
