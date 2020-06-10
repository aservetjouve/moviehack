const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const UserModel = require('../models/User.model');

router.get('/signup', (req, res) => {
  res.render('auth/signup.hbs', {
    signLabel: { message: 'Sign In', href: '/signin' },
    movieLogo: '/',
  });
});

router.post('/signup', (req, res) => {
  // Destructuring
  // req is the object that contains the data from the HTTP request
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    // Error handling catches errors that occur during async processes
    res.status(500).render('auth/signup.hbs', {
      errorMessage:
        'Please enter first name, last name, email address and password',
    });
    return;
  }

  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Email format not correct',
      signLabel: { message: 'Sign In', href: '/signin' },
      movieLogo: '/',
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
      signLabel: { message: 'Sign In', href: '/signin' },
      movieLogo: '/',
    });
    return;
  }

  bcrypt.genSalt(12).then((salt) => {
    bcrypt.hash(password, salt).then((passwordHash) => {
      UserModel.create({ firstName, lastName, email, passwordHash })
        .then(() => {
          // req.session.loggedInUser = req.body;
          res.send('ACCOUNT CREATED');
        })
        .catch((err) => {
          if (err.code === 11000) {
            return res.status(500).render('auth/signup.hbs', {
              errorMessage: 'Email entered already exists!',
              signLabel: { message: 'Sign In', href: '/signin' },
              movieLogo: '/',
            });
          }
          return res.status(500).render('auth/signup.hbs', {
            errorMessage: 'Something went wrong!',
            signLabel: { message: 'Sign In', href: '/signin' },
            movieLogo: '/',
          });
        });
    });
  });
});

router.get('/signin', (req, res) => {
  res.render('auth/signin.hbs', {
    signLabel: { message: 'Sign Up', href: '/signup' },
    movieLogo: '/',
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).render('auth/signin.hbs', {
      errorMessage: 'Email and Password are required',
      signLabel: { message: 'Sign Up', href: '/signup' },
      movieLogo: '/',
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render('auth/signup.hbs', {
      errorMessage: 'Email format not correct',
      signLabel: { message: 'Sign Up', href: '/signup' },
      movieLogo: '/',
    });
    return;
  }

  // Find if the user exists in the database
  UserModel.findOne({ email })
    .then((userData) => {
      bcrypt
        .compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          if (doesItMatch) {
            // req.session is the special object that is available to you
            req.session.loggedInUser = userData;
            res.redirect('/home');
          }
          // if passwords do not match
          else {
            res.status(500).render('auth/signin.hbs', {
              errorMessage: "Passwords don't match",
              signLabel: { message: 'Sign Up', href: '/signup' },
              movieLogo: '/',
            });
            // return;
          }
        })
        .catch(() => {
          res.status(500).render('auth/signin.hbs', {
            errorMessage: "Something wen't wrong!",
            signLabel: { message: 'Sign Up', href: '/signup' },
            movieLogo: '/',
          });
          // return;
        });
    })
    // throw an error if the user does not exists
    .catch(() => {
      res.status(500).render('auth/signin.hbs', {
        errorMessage: "Email doesn't exist",
        signLabel: { message: 'Sign Up', href: '/signup' },
        movieLogo: '/',
      });
      // return;
    });
});

module.exports = router;
