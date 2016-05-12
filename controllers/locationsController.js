'use strict';

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let request = require('request');

const GOOGLE_KEY = process.env.GOOGLE_KEY;

router.route('/:location')
  .get( (req,res) => {
    let location = req.params.location;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+GOOGLE_KEY;

    googleAPI(url, (body) => {
      res.json(JSON.parse(body));
    });
  });


function googleAPI(url, callback) {
  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){
      callback(body);
    }
  });
}

module.exports = router;
