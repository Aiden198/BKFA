var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var memberRouter = require('./routes/BecomeAMember')
var birthKitsRouter = require('./routes/CleanBirthKits')
var contactRouter = require('./routes/Contact')
var donateRouter = require('./routes/Donate')
var faqRouter = require('./routes/FAQ')
var newsRouter = require('./routes/News')
var ourHistoryRouter = require('./routes/OurHistory')
var ourProjectsRouter = require('./routes/OurProjects')
var ourSupportersRouter = require('./routes/OurSupporters')
var ourTeamRouter = require('./routes/OurTeam')
var reportsRouter = require('./routes/Reports')
var resourcesRouter = require('./routes/Resources')
var volunteerRouter = require('./routes/Volunteer')
var hostAnAssemblyDayRouter = require('./routes/HostAnAssemblyDay')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/', memberRouter)
app.use('/', birthKitsRouter)
app.use('/', contactRouter)
app.use('/', donateRouter)
app.use('/', faqRouter)
app.use('/', newsRouter)
app.use('/', ourHistoryRouter)
app.use('/', ourProjectsRouter)
app.use('/', ourSupportersRouter)
app.use('/', ourTeamRouter)
app.use('/', reportsRouter)
app.use('/', resourcesRouter)
app.use('/', volunteerRouter)
app.use('/', hostAnAssemblyDayRouter)

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
