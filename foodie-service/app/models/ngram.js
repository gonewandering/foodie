module.exports = function (sequelize, DataTypes) {

  var Ngram = sequelize.define('Ngram', {
    gram: {type: DataTypes.STRING, unique: 'uniqueHash'},
    length: DataTypes.INTEGER,
    foodID: {type: DataTypes.INTEGER, unique: 'uniqueHash'}
  }, {
    timestamps: false
});

  return Ngram;
};
