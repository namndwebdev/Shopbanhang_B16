var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  validateEmail,
  validatePassword
} = require('@helper/validate');
const { 
  getUserByEmail,
  createUser
} = require('@services/user');

router.post('/signup', async function(req, res, next){
  try {
    let {email, name, password, avatar} = req.body
    // validate
    if(!validateEmail(email)){
      return res.status(400).json('Email khong hop le')
    }
    if(!validatePassword(password)){
      return res.status(400).json('Password khong hop le')
    }

    let userFinded = await getUserByEmail(email)
    if(userFinded){
      return res.status(400).json('Email da ton tai')
    }else{
      password = bcrypt.hashSync(password, saltRounds);
      let newUser = await createUser({email, name, password, avatar})
      newUser = newUser.toObject()
      delete newUser.password
      return res.json(newUser)
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('Tao tai khoan that bai')
  }
})

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    try {
      if (err) { return res.status(400).json('dang nhap khong thanh cong') }
      if (!user) { return res.status(400).json('Tai khoan va mat khau khong dung') }
      
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
      if (err) { 
        return res.status(400).json('dang nhap khong thanh cong') 
      }
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
