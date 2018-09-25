const passport = require('passport')
const User = require('../models/User')
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(User.createStrategy())
passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user, done){
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: "698689303842095",
  clientSecret: "2aa139beb07f944a04e43cce0982f46d",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id })
  .then(user => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    next(error)
  })

}));

module.exports = passport