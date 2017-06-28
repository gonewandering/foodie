module.exports = function (sequelize, DataTypes) {

  var Food = sequelize.define('Food', {
    sr: { type: DataTypes.INTEGER, unique: true},
    name: DataTypes.STRING,
    serving: DataTypes.INTEGER,
    calories: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    sugars: DataTypes.FLOAT,
    fats: DataTypes.FLOAT,
    satFats: DataTypes.FLOAT,
    caffeine: DataTypes.FLOAT,
    fiber: DataTypes.FLOAT
  });

  return Food;
};
