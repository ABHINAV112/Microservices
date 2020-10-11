const { DataTypes } = require("sequelize");

const sequelize = require("./main.js");

const User = sequelize.define(
  "User",
  {
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = User;
