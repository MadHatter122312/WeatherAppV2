'use strict';
// angular.module('skyCast').controller('LoginController', LoginController)
//
// LoginController.$inject = ['User','$state','$http'];

function LoginController($http, $state, User) {
  let self = this;

  self.logInUser = {
    email: '',
    password: ''
  }

  self.logIn = function(user) {
    $http({
      method: 'POST',
      url: '/user/login',
      data: user,
      headers: {'Content-Type': 'application/json'}
    }).then( (data) => {
      if (data.data.success) {
        User.setCurrentUser(data.data.user);
        User.setLoginState(true);
        $http.defaults.headers.common.Authorization = data.data.token;
        $state.go('profile')
      }
      else {
        $state.go('login')
      }
    })
  }


}
