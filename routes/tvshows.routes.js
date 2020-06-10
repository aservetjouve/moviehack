const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;

router.get('/tvshows', (req, res) => {
  if (req.session.loggedInUser) {
    let topTVRated;
    let popularTV;
    let trendingWeek; 
    let crimeTV;
    let newsTV;
    let comedyTV;
    let romanceTV;

    const promisetopTVRated = axios
      .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${myKey}`)
      .then((response) => {
        topTVRated = response.data;
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
      .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${myKey}`)
      .then((response) => {
        trendingWeek = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

      const promiseComedy = axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=${myKey}&query=comedy`)
      .then((response) => {
        comedyTV = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

      const promiseCrimeTV = axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=${myKey}&query=crime`)
      .then((response) => {
        crimeTV = response.data;
      })
      .catch(() => {
        'Something is wrong';
      });

      const promiseRomanceTv = axios
      .get(`https://api.themoviedb.org/3/search/tv?api_key=${myKey}&query=love`)
      .then((response) => {
        romanceTV = response.data;
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

    const promises = [promisetopTVRated, promisePopularTV, promiseTrendingWeek, promiseCrimeTV, promiseNewsTV, promiseComedy, promiseRomanceTv];

    Promise.allSettled(promises).then(() => {
      res.render('tvshows.hbs', {
        movieLogo: '/home',
        homeNav: true,
        footer: true,
        topTVRated,        
        popularTV, 
        trendingWeek,         
        crimeTV,
        newsTV,
        comedyTV,
        romanceTV
      });
    });
  }
  else {
    res.send('Access Denied');
  }
});

module.exports = router;
