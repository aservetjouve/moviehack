require('dotenv').config();


const express = require('express');
const app = express();

const hbs = require('hbs');

//To be able parse post request information
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Template engine
app.set('view engine', 'hbs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: "my-secret-weapon",
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 3600000, //(in milliseconds)
    },
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      ttl: 3600, //(in seconds)
      autoRemove: "disabled",
    }),
  })
);

// require database configuration
require('./configs/db.config');

// Routers
const index = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');



// Routes middleware
app.use('/', index)
app.use('/', authRouter);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`\n == API on port ${port} ==\n`));
