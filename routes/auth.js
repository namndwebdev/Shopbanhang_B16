var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken')

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    try {
      if (err) { return res.status(400).json('dang nhap khong thanh cong') }
      if (!user) { return res.status(400).json('Tai khoan khong ton tai') }
      
      let token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      })
            
      return res.json({
        token,
        user
      })
    } catch (error) {
      return res.status(500).json('Loi server')
    }
  })(req, res, next)
});

router.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));
router.get('/google/callback', function(req, res, next){
  passport.authenticate('google', function(err, user, info) {
    try {
      if (err) { return res.status(400).json('dang nhap khong thanh cong') }
      if (!user) { return res.status(400).json('Tai khoan khong ton tai') }
      
      let token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      })
           
      return res.json({
        token,
        user
      })
    } catch (error) {
      return res.status(500).json('Loi server')
    }
  })(req, res, next)
});


module.exports = router;
