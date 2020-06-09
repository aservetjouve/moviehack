const express = require('express');

const router = express.Router();

const ListModel = require('../models/List.model');

router.get('/list', (req, res) => {
  ListModel.find()
    .then((media)=> {
      console.log(media);
    })
    .catch(() => {
      res.send('Something went wrong');
    });
});

module.exports = router;
