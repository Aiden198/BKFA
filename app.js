require('dotenv').config();

// Load the framework, middleware, and path helpers used to build the Express app.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Keep route imports together so new page groups are easy to register below.
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
var searchRouter = require('./routes/Search')
var volunteerRouter = require('./routes/Volunteer')
var testRouter = require('./routes/test')
var becomeAMemberRouter = require('./routes/BecomeAMember')
var ourApproachRouter = require('./routes/OurApproach')
var newsRouter = require('./routes/News');
var adminNewsRouter = require('./routes/adminNews');

var app = express();

// Render EJS templates from the project's views directory.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parse requests and expose files from public and uploaded-content folders.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));

// Mount each route group at the public URL used by the site.
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/member', memberRouter)
app.use('/cleanbirthkits', birthKitsRouter)
app.use('/contact', contactRouter)
app.use('/donate', donateRouter)
app.use('/faq', faqRouter)
app.use('/news', newsRouter)
app.use('/ourhistory', ourHistoryRouter)
app.use('/ourprojects', ourProjectsRouter)
app.use('/oursupporters', ourSupportersRouter)
app.use('/ourteam', ourTeamRouter)
app.use('/reports', reportsRouter)
app.use('/resources', resourcesRouter)
app.use('/search', searchRouter)
app.use('/volunteer', volunteerRouter)
app.use('/test', testRouter)
app.use('/becomeamember', becomeAMemberRouter)
app.use('/ourapproach', ourApproachRouter)
app.use('/news', newsRouter);
app.use('/admin/news', adminNewsRouter);

// Turn any request that reaches this point into a standard 404 error.
app.use(function(req, res, next) {
  next(createError(404));
});

// Give every Express error the same response shape and error page.
app.use(function(err, req, res, next) {
  // Only expose the full error details while the app is in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Respect an existing status code, or use 500 for an unexpected failure.
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
