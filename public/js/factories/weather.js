'use strict';

function Weather() {

  let weather = {};

  return {
    setCurrentWeather: function(weatherObj) {
      weather = weatherObj;
    },

    getCurrentWeather: function() {
      return weather;
    }
  }
}
