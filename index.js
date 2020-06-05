require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ greeting: process.env.GREETING });
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`\n == API on port ${port} ==\n`));
