'use strict';
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('getconfig');
var util = require('util');
//var hbs = require('hbs');
//var handlebars = require('handlebars');

console.log('config - ' + util.inspect(config, false, null));

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// manually set render engine, under normal circumstances this
// would not be needed as hbs would be installed through npm

// hbs view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// HANDLEBARS HELPERS AND PARTIALS
//hbs.registerPartials(__dirname + '/views/partials');
//hbs.handlebars == handlebars;
//hbs.localAsTemplateData(app);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(hbs());

//app.get('/', routes.index);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    next();
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  next();
});

var server = require('http').createServer(app);
server.listen(config.App.port);
console.log('Industry week started on Port ' + config.App.port);
