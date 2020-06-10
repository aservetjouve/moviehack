/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI, { useNewUrlParser: true })
  .then(() => console.log(`Successfully connected to the database`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to the database`, error);
    process.exit(1);
  });
