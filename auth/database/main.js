const { Sequelize } = require("sequelize");

const dataBaseConfig = require("../../config/database.json");
const sequelize = new Sequelize(dataBaseConfig.SQL_DATABASE_URI);

module.exports = sequelize;
