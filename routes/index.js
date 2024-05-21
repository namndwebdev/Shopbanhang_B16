var express = require('express');
var router = express.Router();
var authRouter = require('./auth')
var uploadRouter = require('./upload')

/* GET home page. */
router.use('/auth', authRouter)
router.use('/upload', uploadRouter)

module.exports = router;
