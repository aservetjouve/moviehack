const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup.hbs');
});

module.exports = router;