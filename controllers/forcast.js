
require('dotenv').config();
var request = require('request');
var express = require('express');
var router = express.Router();





// router.get('/', function(req, res) {
//   res.render('forcast/weather');
// });

router.get('/', function(req, res) {
  var snowInfo = 'http://api.wunderground.com/api/' + process.env.WUNDERGOUND_KEY + '/forecast/q/43.5928066,-110.8601281.json';
  request(snowInfo, function(error, response, body) {
    if (!error, response, body) {
      snowInfo = JSON.parse(body);
      console.log(snowInfo);
      // res.send(snowInfo.forecast.simpleforecast);
      res.render('forcast/weather', {snowInfo: snowInfo.forecast.simpleforecast.forecastday});
    }
  })
});


module.exports = router;
