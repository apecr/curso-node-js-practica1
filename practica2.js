'use strict';
var http = require('https');
var async = require('async');

var calcula2 = function calcula2(){
  http.get('https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-01.json', (res) => {
    if (res.statusCode !== 200) {
      return console.error('Invalid status code ${res.statusCode}');
    }
    let rawData1 = '';
    res.on('data', (chunk) => rawData1 += chunk);
    res.on('end', () => {
      var parsed1 = JSON.parse(rawData1);
      console.log(parsed1.Debt);
      http.get('https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-02.json', (res) => {
        if (res.statusCode !== 200) {
          return console.error('Invalid status code ${res.statusCode}');
        }
        let rawData2 = '';
        res.on('data', (chunk) => rawData2 += chunk);
        res.on('end', () => {
          var parsed2 = JSON.parse(rawData2);
          console.log(parsed2.Debt);
        }
      );
      }).on('error', (e) => {
        console.error('Got error: ${e.message}');
      });
    }
  );
  }).on('error', (e) => {
    console.error('Got error: ${e.message}');
  });
}

var calculaDebt = function calculaDebt(number, callback){
  var url = '';
  if (number < 10){
    url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-0' +number+ '.json';
  } else {
    url = 'https://raw.githubusercontent.com/alexfernandez/curso-devacademy/master/async/account-' +number+ '.json';
  }
  http.get(url, (res) => {
    if (res.statusCode !== 200) {
      return console.error('Invalid status code ${res.statusCode}');
    }
    let rawData1 = '';
    res.on('data', (chunk) => rawData1 += chunk);
    res.on('end', () => {
      var parsed1 = JSON.parse(rawData1);
      console.log('Deuda del pollo %s: %s', number, parsed1.Debt);
      return callback(null, parsed1.Debt);
    }
  );
  }).on('error', (e) => {
    console.error('Got error: ${e.message}');
  });
}

var array = [];
for (var i = 1; i<= 10; i++){
  array.push(i);
}
var tasks = array.map(function (value){
  return function(callback){
    calculaDebt(value, callback);
  }
});

async.parallel(tasks, function(error, result){
  console.log('results %j', result);
  var total = 0;
  result.forEach(function (item){
    console.log(item);
    total += item;
  })
  console.log('Deuda total %s', total);
});



calculaDebt(2, function(error, debt){
  console.log(`Debt is ${debt}`);
});
