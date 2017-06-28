var db = require('../models');
var request = require('request-promise');

function importFoods(offset) {
  offset = offset || 0;
  let req = 'http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=HJxwGoX37NMqQbgDuU2hGosRwXkJ0OalZYInhs4R&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=606&nutrients=291&nutrients=262&offset=' + offset;

  request.get(req).then(function(result) {
    result = JSON.parse(result);
    var max = result.report.end;
    var total = result.report.total;

    let foods = result.report.foods;

    foods = foods.map(function(food) {
      return {
        sr: food.ndbno,
        name: food.name,
        serving: food.weight,
        calories: (food.nutrients[3].gm > 0 ? food.nutrients[3].gm / 100 : 0),
        carbs: (food.nutrients[2].gm > 0 ? food.nutrients[2].gm / 100 : 0),
        sugars: (food.nutrients[0].gm > 0 ? food.nutrients[0].gm / 100 : 0),
        fats: (food.nutrients[1].gm > 0 ? food.nutrients[1].gm / 100 : 0),
        satFats: (food.nutrients[5].gm > 0 ? food.nutrients[5].gm / 100 : 0),
        caffeine: (food.nutrients[6].gm > 0 ? food.nutrients[6].gm / 100 : 0),
        fiber: (food.nutrients[4].gm > 0 ? food.nutrients[4].gm / 100 : 0)
      }
    });

    db.Food.bulkCreate(foods, {ignoreDuplicates: true}).then(function (max, total) {
      if (max < total) {
        console.log('Processing ' + max);
        importFoods(max);
      }
    }.bind(this, max, total));
  })
}

importFoods(3750);
