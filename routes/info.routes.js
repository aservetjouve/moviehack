const express = require('express');

const router = express.Router();

const axios = require('axios');

const myKey = process.env.TMDb_KEY;
const ListModel = require('../models/List.model');

router.get('/info/:media_type/:id', (req, res) => {
  if (req.session.loggedInUser) {
    const { id } = req.params;
    const mediaType = req.params.media_type;
    let key;

    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${myKey}`
      )
      .then((response) => {
        key = response.data.results[0].key;
      })
      .catch(() => {
        'Something went wrong';
      });
    axios
      .get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${myKey}`)
      .then((response) => {
        ListModel.findOne({ userId: req.session.loggedInUser._id }).then(
          (listResponse) => {
            const mediaInfo = response.data;

            if (listResponse) {
              let moviesArray = JSON.parse(
                JSON.stringify(listResponse.arrayMediasID)
              );

              if (moviesArray.includes(id)) {
                mediaInfo.isMovieAdded = true;
              } else {
                mediaInfo.isMovieAdded = false;
              }
            }
            res.render('info.hbs', {
              movieLogo: '/home',
              homeNav: true,
              footer: true,
              mediaInfo,
              mediaType,
              key,
            });
          }
        );
      })
      .catch(() => {
        'Something is wrong';
      });
  } else {
    res.render('access-denied.hbs');
  }
});

router.get('/info/:media_type/:id/add', (req, res) => {
  const { id } = req.params;
  const mediaType = req.params.media_type;
  const user = req.session.loggedInUser;
  ListModel.find({ userId: user._id })
    .then((response) => {
      if (!response.length) {
        // first time
        ListModel.create({ userId: user._id, arrayMediasID: [id] });
      } else if (!response[0].arrayMediasID.includes(id)) {
        ListModel.updateOne(
          { userId: user._id },
          { $push: { arrayMediasID: [id] } }
        )
          .then(() => {
            res.redirect(`/info/${mediaType}/${id}`);
          })
          .catch((err) => {
            res.send('Crashed');
          });
      } else res.redirect(`/info/${mediaType}/${id}`);
    })
    .catch(() => {
      res.send('Something went wrong!');
    });
});

router.get('/info/:media_type/:id/delete', (req, res) => {
  const { id } = req.params;
  const mediaType = req.params.media_type;
  const user = req.session.loggedInUser;
  ListModel.find({ userId: user._id })
    .then((listResponse) => {
      let moviesArray = JSON.parse(
        JSON.stringify(listResponse[0].arrayMediasID)
      );

      moviesArray.splice(moviesArray.indexOf(id), 1);
      ListModel.findOneAndUpdate(
        { userId: req.session.loggedInUser._id },
        { $set: { arrayMediasID: moviesArray } }
      )
        .then(() => {
          res.redirect(`/info/${mediaType}/${id}`);
        })
        .catch((err) => {
          res.send('Crashed');
        });
    })
    .catch(() => {
      res.send('Something went wrong!');
    });
});

module.exports = router;
