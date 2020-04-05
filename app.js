var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let empData = [
  {
  "userId":"rirani",
  "jobTitleName":"Developer",
  "firstName":"Romin",
  "lastName":"Irani",
  "preferredFullName":"Romin Irani",
  "employeeCode":"E1",
  "region":"CA",
  "phoneNumber":"408-1234567",
  "emailAddress":"romin.k.irani@gmail.com"
  },
  {
  "userId":"nirani",
  "jobTitleName":"Developer",
  "firstName":"Neil",
  "lastName":"Irani",
  "preferredFullName":"Neil Irani",
  "employeeCode":"E2",
  "region":"CA",
  "phoneNumber":"408-1111111",
  "emailAddress":"neilrirani@gmail.com"
  },
  {
  "userId":"thanks",
  "jobTitleName":"Program Directory",
  "firstName":"Tom",
  "lastName":"Hanks",
  "preferredFullName":"Tom Hanks",
  "employeeCode":"E3",
  "region":"CA",
  "phoneNumber":"408-2222222",
  "emailAddress":"tomhanks@gmail.com"
  },
  {
  "userId":"rirani",
  "jobTitleName":"Developer",
  "firstName":"Romin",
  "lastName":"Irani",
  "preferredFullName":"Romin Irani",
  "employeeCode":"E1",
  "region":"CA",
  "phoneNumber":"408-1234567",
  "emailAddress":"romin.k.irani@gmail.com"
  },
  {
  "userId":"nirani",
  "jobTitleName":"Developer",
  "firstName":"Neil",
  "lastName":"Irani",
  "preferredFullName":"Neil Irani",
  "employeeCode":"E2",
  "region":"CA",
  "phoneNumber":"408-1111111",
  "emailAddress":"neilrirani@gmail.com"
  }
  ];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors())


  //pgSQL 
  // const {Pool, Client} = require('pg');
  // const connectionString = 'postgressql://postgress:demo1234@localhost:5432/testdb';
  // let dbConnected = false;
  // let client = null;
  // client = new Client({
  //   connectionString
  // });

  const chkDBConnect = (req, res, next) => {
    console.log('dbConnected');
    next();
  };

  const empDB = (req, res, next) => {
    console.log('emp Data');
      next();
  };

  app.use((req, res, next) => {
    console.log('Dummy MiddleWare creation');
    next();
  });

  // fetching API
  app.get('/fetchEmployees', chkDBConnect, empDB, (req, res, next) => {
    console.log('fetch');    
    let temempData = empData.slice();
    res.json(temempData);
    res.end();
  });

  app.get('/moreEmployeeData', chkDBConnect, empDB, (req, res, next) => {
    console.log('fetch');
    empData = empData.concat(empData);    
    res.json(empData);
    res.end();
  });


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
