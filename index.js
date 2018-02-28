require('dotenv').config();
var request = require('request');
var flash = require('connect-flash');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public')); //look in public for js,css,and imgs

app.use(session({
  secret: process.env.SESSION_SECRET, //string used to sign into session (put SESSION_SECRET into .env and equal to a salt)
  resave: false,      // save the session even if it isnt modified
  saveUninitialized: true    //if session new, but hasnt been changed save it
}));

app.use(flash());  //sessions needs to be in place to use flash

app.use(passport.initialize());   //passport needs to be below "use(session" cause passport uses session
app.use(passport.session());

app.use(function(req, res, next) {    //renders all the flash
  // before every route, attach the flash message and current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/forcast', require('./controllers/forcast'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
