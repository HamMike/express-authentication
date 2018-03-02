
require('dotenv').config();
var db = require('../models');
var request = require('request');
var express = require('express');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var fs = require('fs');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();





// router.get('/', function(req, res) {
//   res.render('forcast/weather');
// });

// router.get('/', function(req, res) {
//   var snowInfo = 'http://api.wunderground.com/api/' + process.env.WUNDERGOUND_KEY + '/forecast/q/43.5928066,-110.8601281.json';
//   request(snowInfo, function(error, response, body) {
//     if (!error, response, body) {
//       snowInfo = JSON.parse(body);
//       console.log(snowInfo);
//       // res.send(snowInfo.forecast.simpleforecast);
//       res.render('forecast/weather', {snowInfo: snowInfo.forecast.simpleforecast.forecastday});
//     }
//   })
// });


router.get('/:resort', isLoggedIn, function(req, res) {
  var resort = req.params.resort;
  db.post.findAll({
    where: { title: resort }
  }).then(function(post) {
    console.log(post);
    var snowInfo = 'http://api.wunderground.com/api/' + process.env.WUNDERGOUND_KEY + '/forecast/q/'+resort+'.json';
    request(snowInfo, function(error, response, body) {
      if (!error, response, body) {
        snowInfo = JSON.parse(body);
        // console.dir(snowInfo);
        // res.send(snowInfo.forecast.simpleforecast);
        res.render('forecast/weather', {snowInfo: snowInfo.forecast.simpleforecast.forecastday, post: post, resort: resort });
        }
    })
  });
});



router.post('/:resort/comment', upload.single('image'), function(req, res) {
  // console.log(req.body.image)
  // console.log(req.user.id)
  // if (result.url) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
      console.log(db);
      db.post.create({
        title: req.body.title,
        comment: req.body.comment,
        image: result.url,
        userId: req.user.id
      }).then(function(post) {
        fs.readdir('./uploads', function(err, items) {
          items.forEach(function(file) {
            fs.unlink('./uploads/' + file);
            console.log('Deleted ' + file);
          })
        })
        res.redirect('/forecast/weather');
      })
    });
//   } else {
//     db.post.create({
//       title: req.body.title,
//       comment: req.body.comment,
//       image: null,
//       userId: req.user.id
//     }).then(function(post) {
//       res.redirect('/forecast/weather');
//     })
//   }
});





module.exports = router;
