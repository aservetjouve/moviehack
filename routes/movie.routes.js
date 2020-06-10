const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;

router.get('/movies', (req, res) => {
  if (req.session.loggedInUser) {
    let topMovieRated;
    let popularMovie;
    let trendingWeek;
    let actionMovie;
    let comedyMovie;

    const promisetopMovieRated = axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}`)
      .then((response) => {
        topMovieRated = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promisePopularMovie = axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}`)
      .then((response) => {
        popularMovie = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promiseTrendingWeek = axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${myKey}`)
      .then((response) => {
        trendingWeek = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promiseActionMovie = axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&query=action`
      )
      .then((response) => {
        actionMovie = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promiseComedyMovie = axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&query=comedy`
      )
      .then((response) => {
        comedyMovie = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promises = [
      promisetopMovieRated,
      promisePopularMovie,
      promiseTrendingWeek,
      promiseActionMovie,
      promiseComedyMovie,
    ];

    Promise.allSettled(promises).then(() => {
      res.render('movie.hbs', {
        movieLogo: '/home',
        homeNav: true,
        footer: true,
        topMovieRated,
        popularMovie,
        trendingWeek,
        actionMovie,
        comedyMovie,
      });
    });
  } else {
    res.send('Access Denied');
  }
});

module.exports = router;
