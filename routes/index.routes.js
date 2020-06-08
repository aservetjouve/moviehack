const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => res.render('index.hbs', { landingNav: true }));

module.exports = router;
