'use strict';

function SignupController($http, $state, User) {
  let self = this;

  self.signupUser = {
    userName: '',
    email: '',
    password: '',
    queries: [],
  }

  self.sendUser = function(user) {
    $http({
      method: 'POST',
      url: '/user/new',
      data: user,
      headers: {'Content-Type': 'application/json'}
    }).then( (user) => {
      if (user.data.success === true) {
        $state.go('login');
      }
      else {
        //put a flash message here or something notify that signup failed
        $state.go('signup');
      }
    });
  }
}
