var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 3_600_000 }));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'nodemy',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

require('@config/passport')

app.get('/demo', (req, res)=>{
  res.sendFile(path.join(__dirname, 'test.html'))
})
app.use('/api', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
