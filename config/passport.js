const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id refers to "Object ID(_id)" on a MongoDB item(Not googleId)
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result)
          return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      });
      // if (user.password !== password) {
      //   return done(null, false, { message: "Incorrect password." });
      // }
      // return done(null, user);
    });
  })
);
