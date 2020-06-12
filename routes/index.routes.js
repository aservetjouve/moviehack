const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res) =>
  res.render('index.hbs', { landingNav: true })
);

router.get('/devs', (req, res) =>
  res.render('devs.hbs', { footer: true, movieLogo: '/home' })
);

module.exports = router;
