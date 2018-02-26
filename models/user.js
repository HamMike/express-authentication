'use strict';
var bcrypt = require('bcrypt'); //requiring bcrypt

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {                                   //validating user inputs
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Ivalid user name. Must by btwn 12 and 99 chars.'
        }
      }
    },
    email: {                                   //validating user inputs
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid Email address'
        }
      }
    },
    password: {                                   //validating user inputs
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be at least 8 characters.'
        }
      }
    }
  }, {
    hooks: {
      //before creating model hash password (data that is getting ready to be written to db, options)
      beforeCreate: function(pendingUser, options) {
        //check to make sure we have pending user and pUser has a password
        if (pendingUser && pendingUser.password) {
          //if yes, hash password (password, salt round)
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          //going to change password attached to pendingUser
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {                 //user.ass is a class method
    // associations can be defined here
  }
  //checking to see if password is valid( entered password equals stored password)
  //passwordTyped is the password entered, apllied to the prototype being created (prototyple inheritance)
  user.prototype.validPassword = function(passwordTyped) {
    // where the password is being compared
    // this is refering to the current record that was pulled from the database
    return bcrypt.compareSync(passwordTyped, this.password);
  };

  //converter function that coverts to JSON and removes sensitive information (password key) before that info get back to the client side
  user.prototype.toJSON = function() {
    //get the record (pasword key)
    var userData = this.get();
    //delete the record (password key)
    delete userData.password;
    return userData;
  }
  return user;
};
