var passport = require('passport');
var LocalStrategy = require('passport-local');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('@models/User')

passport.serializeUser( (user, done) => {
    done(null, user)
})
  
passport.deserializeUser((user, done) => {
    done (null, user)
})

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        UserModel.findOne({ email: email, password: password }).lean()
        .then(user=>{
            if(!user){
            return done(null, false)
            }

            if(user){
            return done(null, user)
            }
        })
        .catch(err=>{
            return done(err)
        })
    }
));


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    
    console.log(profile._json);
   if(profile._json){
        cb(null, profile._json)
   }else{
        cb(new Error("Khong dang nhap thanh cong"))
   }
  }
));