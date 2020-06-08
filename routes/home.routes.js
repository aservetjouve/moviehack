const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;

router.get('/home', (req, res) => {
  if (req.session.loggedInUser) {
    let topMovieRated;
    let topTVRated;
    const promisetopMovieRated = axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}`)
      .then((response) => {
        topMovieRated = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });
    const promisetopTVRated = axios
      .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${myKey}`)
      .then((response) => {
        topTVRated = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promises = [promisetopMovieRated, promisetopTVRated];

    Promise.allSettled(promises).then(() => {
      res.render('home.hbs', {
        movieLogo: '/home',
        topMovieRated,
        topTVRated,
      });
    });
  }
  else {
    res.send('Access Denied');
  }
});

module.exports = router;
