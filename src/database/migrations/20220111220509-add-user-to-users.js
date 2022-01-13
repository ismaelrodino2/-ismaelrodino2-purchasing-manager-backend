"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "users",
      "owner",
      {
        type: Sequelize.DataTypes.INTEGER,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "owner");
  },
};
