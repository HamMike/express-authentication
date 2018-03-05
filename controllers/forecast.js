
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




router.get('/:resort', isLoggedIn, function(req, res) {
  var resort = req.params.resort;
  db.post.findAll({
    where: { title: resort }
  }).then(function(post) {
    // console.log(post);
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

    cloudinary.v2.uploader.upload(req.file.path, {width: 400, height: 400, crop: "fill"}, function(error, result) {

      db.post.create({
        title: req.body.title,
        comment: req.body.comment,
        image: result.url,
        userId: req.user.id
      }).then(function(post) {
        fs.readdir('./uploads', function(err, items) {
          items.forEach(function(file) {
            fs.unlink('./uploads/' + file);
          })
        })
        res.redirect('/forecast/' + req.params.resort);
      })
    });

});

router.get('/:id/edit', function(req, res) {
  db.post.findById(req.params.id).then(function(commentId) {
    res.render('forecast/edit', {post: commentId})
  })
});


router.put('/:id/new', function(req, res) {
  db.post.update({
    comment: req.body.comment
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.send('success');
  })
});

router.delete('/:id', function(req,res) {
  db.post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.send('destroyed');
  })
});






module.exports = router;
