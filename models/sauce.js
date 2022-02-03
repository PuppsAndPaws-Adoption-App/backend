const { Sequelize, DataTypes, Model, INTEGER } = require("sequelize");
const { sequelize } = require("../db");

class Sauce extends Model {}

Sauce.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Sauce };
