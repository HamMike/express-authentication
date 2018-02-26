var express = require('express');
var db = require('../models'); //allows access to data in models
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

//POST route for signup form to sign up user
router.post('/signup', function(req, res) {
  //res.send(req.body);  //checked to see if route is correct

  db.user.findOrCreate({     //FORC takes in an abject as it param
    where: { email: req.body.email },  //looks for email in the where
    defaults: {
      name: req.body.name,              //create if not there
      password: req.body.password
    }
  }).spread(function(user, created) {  //promise to be executed after (takes two params instead of the .then done (only one))
    if (created) {
      console.log('user created');
      //user created
      // go back to homepage
      //res.redirect('/');
      //but now that we set up passport we use code below
      passport.authenticate('local', {
        successRedirect: '/',    //getting authentication through the function passport.authentication(), then passing in req res
        successFlash: 'Account created and logged in'     //flash
      })(req, res);
    } else {
      // email already exists in db
      //go to signup page
      console.log('Email already exists');
      req.flash('error', 'Email already exists');   //flash
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {        //catch function for errors
    console.log('An error occured: ', error.message);
    req.flash('error', error.message);      //flash
    res.redirect('/auth/signup');  // use /auth because it is a full path being used in a redirect
  })
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

//POST route for login
router.post('/login', passport.authenticate('local', {  //instead of calling own function passport is passed in
  successRedirect: '/',
  successFlash: 'You have logged in',   //flash
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password'
}));

router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out!');     //flash
  res.redirect('/');
});

module.exports = router;
