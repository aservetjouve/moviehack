const mongoose = require('mongoose');

const dbDebugger = require('debug')('app:db');

// const mongodbURI = 'mongodb://localhost:27017/moviehackDB'
const mongodbURI = process.env.MONGODB_URI;

mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => dbDebugger('Successfully connected to the database'))
  .catch((error) => {
    dbDebugger('An error ocurred trying to connect to the database', error);
    process.exit(1);
  });
