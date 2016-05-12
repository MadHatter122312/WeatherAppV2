'use strict';

function SearchController(User, Weather, $http, $state) {
  console.log('instance of search controller!');
  let self = this;

  self.searchFor = undefined;

  self.coords = {
    lat: null,
    lng: null
  }

  self.location = "Your Location";

  self.searchWeather = function() {
    let userID = User.getCurrentUser()._id

//this should be packaged into the User factory.
    if (self.searchFor) {
      $http({
        method: 'PUT',
        url: '/user/'+userID,
        data: {newQuery: self.searchFor}
      }).then( (response) => {
        let queries = response.data.queries;
        let newQuery = queries[queries.length - 1];
        User.addQuery(newQuery)
        $http({
          method: 'GET',
          url: '/location/'+self.searchFor
        }).then( (data) => {
          let searchLocation = data.data.results[0].geometry.location;
          self.location = data.data.results[0].formatted_address;
          success(searchLocation);
        });
      });
    }
//end package
  }

  self.getUser = function() {
    return User;
  }

  self.load = function() {
    console.log('getting current location!');
    navigator.geolocation.getCurrentPosition(success)
  }

  self.getWeather = function() {
    return Weather.getCurrentWeather();
  }

  function success(pos) {
    console.log('In success function!');
    self.coords.lat = pos.lat || pos.coords.latitude;
    self.coords.lng = pos.lng || pos.coords.longitude;

    $http({
      method: 'GET',
      url: '/weather/' + self.coords.lat + '/' + self.coords.lng
    }).then( (weatherData) => {
      if (weatherData.status === 200) {
        Weather.setCurrentWeather(weatherData.data);
      }
      else {
        alert('error fetching weather data!');
      }
    });
  }


}
