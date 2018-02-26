var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models'); //require access to database

// Passport "serializes" objects to make them easy to store
// converting the user to an identifier
passport.serializeUser(function(user, cb) {  //cb stands for callback
  cb(null, user.id);         //taking the user and turning user into id
});

// Passport "deserializes" objects by taking the user's serialization id
// and looking it up in the database
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);         //taking the user.id and turning it back to user
  }).catch(cb);
});

//set up the local auth strategy
passport.use(new LocalStrategy({               //this creates a new object with a bunch of options
  usernameField: 'email',
  password: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: {email: email}
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);   //if successfully logged in return user to be stored in session
    }
  }).catch(cb);
}));


module.exports = passport;
