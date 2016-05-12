'use strict';

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let request = require('request');

const WEATHER_KEY = process.env.WEATHER_KEY;

router.route('/:lat/:lng')
  .get( (req,res) => {
    let lat = req.params.lat;
    let lng = req.params.lng;
    let url = 'https://api.forecast.io/forecast/' + WEATHER_KEY + '/' + lat + ',' + lng;

    weatherAPI(url, (body) => {
      res.json(JSON.parse(body));
    });
  });



function weatherAPI(url, callback) {
  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){
      callback(body);
    }
  });
}

module.exports = router;
