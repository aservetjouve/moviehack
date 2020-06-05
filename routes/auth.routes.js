const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model')


router.get('/signup', (req, res) => {
  res.render('auth/signup.hbs');
});

router.post('/signup', (req, res) => {
  //Destructuring
  //req is the object that contains the data from the HTTP request
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    //Error handling catches errors that occur during async processes
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Please enter first name, last name, email address and password',
    });
    return;
  }

  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Email format not correct',
    });
    return;
  }

  const myPassRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  if (!myPassRegex.test(password)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage:
        'Password needs to have 8 characters, a number, an Uppercase alphabet and one special character from [!@#$%^&*]',
    });
    return;
  }

  bcrypt.genSalt(12).then((salt) => {
    bcrypt.hash(password, salt).then((passwordHash) => {
      UserModel.create({ firstName, lastName, email, passwordHash })
        .then(() => {
          //req.session.loggedInUser = req.body;
          res.send('ACCOUNT CREATED');
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/signup.hbs", {
              errorMessage: "Email entered already exists!",
            });
            return;
          } else {
            res.status(500).render("auth/signup.hbs", {
              errorMessage: "Something went wrong!",
            });
            return;
          }
        });
    });
  });
});

module.exports = router;
