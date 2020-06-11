const express = require('express');

const router = express.Router();

const axios = require('axios');

const ListModel = require('../models/List.model');

const myKey = process.env.TMDb_KEY;

router.get('/list', (req, res) => {
  const list = [];
  let promises = [];
  const user = req.session.loggedInUser;
  ListModel.find({ userId: user._id })
    .then((media) => {
      for (const obj of media[0].arrayMedia) {
        
         promises += axios
          .get(
            `https://api.themoviedb.org/3/${obj.mediaType}/${obj.id}?api_key=${myKey}`
          )
          .then((response) => {
            list.push(response.data);
            // console.log('inside axios ',list)
          })
          .catch(() => {
            res.send('Something went wrong 1');
          });
          console.log('promises ', promises)
      }
      
    })
    .catch(() => {
      res.send('Something went wrong 2');
    });

    setTimeout(function (){
      Promise.allSettled(promises)
        .then(()=>{
          console.log('list outside ',list)
          res.render('list.hbs', { list });
        })
    }, 1000)
});

module.exports = router;


