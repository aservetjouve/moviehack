require('dotenv').config();

const express = require('express');
const app = express();

const hbs = require('hbs');

// Template engine
app.set('view engine', 'hbs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// require database configuration
require('./configs/db.config');

// Routers
const authRouter = require('./routes/auth.routes');

// Routes middleware
app.use('/', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`\n == API on port ${port} ==\n`));
