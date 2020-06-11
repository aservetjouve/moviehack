const express = require('express');

const router = express.Router();

const axios = require('axios');

const ListModel = require('../models/List.model');

const myKey = process.env.TMDb_KEY;

router.get('/list', (req, res) => {
  const list = [];
  ListModel.find()
    .then((media) => {
      for (const obj of media[0].arrayMedia) {
        const str = `https://api.themoviedb.org/3/${obj.mediaType}/${obj.id}?api_key=${myKey}`;
        axios
          .get(
            `https://api.themoviedb.org/3/${obj.mediaType}/${obj.id}?api_key=${myKey}`
          )
          .then((response) => {
            list.push(response.data);
          })
          .catch(() => {
            res.send('Something went wrong');
          });
      }
      res.render('list.hbs', { list });
    })
    .catch(() => {
      res.send('Something went wrong');
    });
});

module.exports = router;
