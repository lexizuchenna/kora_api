const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
      Users.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "User does not exist" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }
        });
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, user) {
      done(err, user);
    });
  });
};