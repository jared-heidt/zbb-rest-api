const express = require('express')
let cors = require('cors')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const connectDB = require('./src/connect');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

dotenv.config({ path: './.env' })

const app = express()
const port = 5000

// Passport Config
require('./src/passport')(passport);

app.use(cors())
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Templating Engine
app.use(expressLayouts);
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const albumRouter = require('./src/albumRoutes')
app.use('/users', require('./src/userRoutes.js'));
app.use('/', require('./src/indexRoutes.js'));

app.use('/albums', albumRouter)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_LOCAL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();