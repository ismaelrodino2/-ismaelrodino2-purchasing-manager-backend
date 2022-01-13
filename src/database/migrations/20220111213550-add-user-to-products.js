"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "products",
      "owner",
      {
        type: Sequelize.DataTypes.INTEGER,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("products", "owner");
  },
};
