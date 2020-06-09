var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { mongodb } = require('./helpers/setting')

var indexRouter = require('./routes/index');

var app = express();

var connectionStr = `mongodb://${mongodb.user}:${mongodb.pass}@${mongodb.host},${mongodb.host2},${mongodb.host3}/${mongodb.db}?replicaSet=rs0&authSource=admin`

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/mmi_scraper_2020', {
//   useNewUrlParser: true, 
//   autoIndex: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });
// console.log(mongodb)
mongoose.connect(connectionStr, mongodb.options)

mongoose.connection.on('open', function(){
  console.log('Connected')
})
mongoose.connection.on('disconnect', function(){
  console.log('Disconnected')
})

mongoose.connection.on('error', function (err){
  console.log('Error',err)
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * Temporary
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/mmi-endpoints/v0/', indexRouter);

app.use(function(req, res, next){
  if(req.path === '/'){
    res.redirect('/mmi-endpoints/v0/')
  }else{
    next()
  }
})

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
  res.status(err.status || 500).send({'error': err });
  // res.render('error');
});

module.exports = app;
