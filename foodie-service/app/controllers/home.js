var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
});

router.get('/api/food', function (req, res, next) {
  db.sequelize.query('SELECT sr AS id, name, MATCH(name) AGAINST(\'' + req.query.q + '\' IN NATURAL LANGUAGE MODE) AS \'score\' FROM FOOD WHERE MATCH(name) AGAINST(\'' + req.query.q + '\' IN NATURAL LANGUAGE MODE) LIMIT 10;').then(function (foods) {
    res.json({ results: foods[0]});
  });
});

router.get('/api/food/:id', function (req, res, next) {
  db.Food.find({where: {sr: req.params.id }}).then(function (result) {
    res.json({ results: result });
  });
});
