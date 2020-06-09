const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;
const ListModel = require('../models/List.model')

router.get('/info/:media_type/:id', (req, res) => {
  if (req.session.loggedInUser) {
    const { id } = req.params;
    const mediaType = req.params.media_type;
    axios
      .get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${myKey}`)
      .then((response) => {
        const mediaInfo = response.data;
        res.render('info.hbs', {
          movieLogo: '/home',
          homeNav: true,
          mediaInfo,
          mediaType,
        });
      })
      .catch(() => {
        'Something is wrong';
      });
  } else {
    res.send('Access Denied');
  }
});

router.get('/info/:media_type/:id/add', (req, res) => {
  const { id } = req.params;
  const mediaType = req.params.media_type;
  console.log("mediaType = ", mediaType);
  const user = req.session.loggedInUser;
  ListModel.find({ userId: user._id })
    .then((response) => {
      if (!response) { // first time
        ListModel.create({ userId: user._id, arrayMedia: [{ id }] });
      } else {
        ListModel.updateOne( // list already created with at least one element
          { userId: user._id },
          { $push: { arrayMedia: [{ id }] } },
        )
          .then(() => {
            // res.send('Worked!');
            res.redirect(`/info/${mediaType}/${id}`);
          })
          .catch((err) => {
            // console.log(err);
            res.send('Crashed');
          });
      }
    })
    .catch(() => {
      res.send('Something went wrong!');
    });
});

module.exports = router;
