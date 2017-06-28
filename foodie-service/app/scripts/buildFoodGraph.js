var db = require('../models');
var request = require('request-promise');
var sw = require('stopword');
var async = require('async');

function powerSet( list ){
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;

    for (var i = 1; i < combinationsCount ; i++ ){
        var combination = [];
        for (var j=0;j<listSize;j++){
            if ((i & (1 << j))){
                combination.push(list[j]);
            }
        }
        set.push(combination);
    }
    return set;
}

function buildFoodGraph() {
  db.Food.all().then(function (records, i) {
    var barr = [];
    var graph = async.eachLimit(records, 3, function (record, callback) {
      var out = [];

      var str = record.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
      str = str.replace(/\s{2,}/g,' ');
      var arr = str.toLowerCase().split(' ');
      arr = sw.removeStopwords(arr);

      var ngrams = powerSet(arr);

      out = ngrams.map(function (d) {
        d.sort();

        var l = {
          gram: d.join(','),
          length: d.length,
          foodID: record.id
        }

        return l;
      });

      out = out.filter(function (d) {
        return d.gram.split(',').length > 3 ? false : true
      })

      db.Ngram.bulkCreate(out).then(function () {
        console.log(record.id);
        callback();
      }).catch(function (err) { callback(); });
    });
  });
}

buildFoodGraph();
