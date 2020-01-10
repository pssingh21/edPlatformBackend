var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('./config/config');
var dashboard = require('./routes/dashboard');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoute = require('./routes/auth')(config);
var uni = require('./routes/uni')();

var authenticate = require('./middlewares/authenticate');
var authorize = require('./middlewares/authorize');
require('./db')(config);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoute);
app.use('/uni', authenticate, uni);
app.use('/dashboard', authenticate, dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //send error as json
  res.status(err.status || 500).json(err);
  
  // render the error page
  // res.render('error');
});

module.exports = app;
