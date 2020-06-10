const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;

router.get('/home', (req, res) => {
  if (req.session.loggedInUser) {
    let topMovieRated;
    let topTVRated;
    let popularMovie;
    let popularTV;
    let trendingWeek;
    let actionMovie;
    let crimeTV;
    let comedyMovie;
    let newsTV;

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

    const promisePopularMovie = axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}`)
      .then((response) => {
        popularMovie = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });
    const promisePopularTV = axios
      .get(`https://api.themoviedb.org/3/tv/popular?api_key=${myKey}`)
      .then((response) => {
        popularTV = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    const promiseTrendingWeek = axios
      .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${myKey}`)
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

    const promiseCrimeTV = axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${myKey}&query=crime`
      )
      .then((response) => {
        crimeTV = response.data;
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

    const promiseNewsTV = axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=${myKey}&query=news`)
      .then((response) => {
        newsTV = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

    //

    const promises = [
      promisetopMovieRated,
      promisetopTVRated,
      promisePopularMovie,
      promisePopularTV,
      promiseTrendingWeek,
      promiseActionMovie,
      promiseCrimeTV,
      promiseComedyMovie,
      promiseNewsTV,
    ];

    Promise.allSettled(promises).then(() => {
      res.render('home.hbs', {
        movieLogo: '/home',
        homeNav: true,
        footer: true,
        topMovieRated,
        topTVRated,
        popularMovie,
        popularTV,
        trendingWeek,
        actionMovie,
        crimeTV,
        comedyMovie,
        newsTV,
      });
    });
  } else {
    res.send('Access Denied');
  }
});

module.exports = router;
