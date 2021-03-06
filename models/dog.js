const { Sequelize, DataTypes, Model, INTEGER } = require("sequelize");
const { sequelize } = require("../db");

class Dog extends Model {}

Dog.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    size: DataTypes.STRING,
    description: DataTypes.STRING,
    zipCode: DataTypes.INTEGER
 
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Dog };
