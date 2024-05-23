var express = require('express');
var router = express.Router();
var authRouter = require('./auth')
var uploadRouter = require('./upload')
var userRouter = require('./user')
const {checkAuth} = require('@middlewares/authen')
/* GET home page. */
router.use('/auth', authRouter)
router.use('/user', checkAuth, userRouter)
router.use('/upload', uploadRouter)

module.exports = router;
