var passport = require('passport');
var LocalStrategy = require('passport-local');
const UserModel = require('@models/User')

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

