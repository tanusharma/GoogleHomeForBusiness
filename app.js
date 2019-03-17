var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mean-angular6')
//comment2
const options = {
  reconnectTries: 5000,
  reconnectInterval: 0,
  socketTimeoutMS: 100000,
  connectTimeoutMS: 100000
}//options object needed to avoid mongodb network tiemout issues hopefully
//c
mongoose.connect('mongodb://tanu:test1234567@ds123635.mlab.com:23635/empdata', options)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/employeeRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/employees', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/employee-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/employee-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/employee-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', apiRouter);

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
  res.sendStatus(err.status);
});

module.exports = app;
