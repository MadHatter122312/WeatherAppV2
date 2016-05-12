'use strict';

angular.module('skyCast', [
  'ui.router',
])
  .factory('User', User)
  .factory('Weather', Weather)
  .controller('LoginController', LoginController)
  .controller('NavController', NavController)
  .controller('SignupController', SignupController)
  .controller('SearchController', SearchController)
  .run(['$rootScope','$state','User', function($rootScope, $state, User) {

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      let isAuthenticationRequired = toState.data
        && toState.data.requiresLogin
        && !User.getLoginState();

      if (isAuthenticationRequired) {
        event.preventDefault();
        $state.go('login');
      }
    })
  }]);


  User.$inject = ['$http','$state'];
  SignupController.$inject = ['$http', '$state', 'User'];
  LoginController.$inject = ['$http', '$state', 'User'];
  NavController.$inject = ['User', '$state', '$http'];
  SearchController.$inject = ['User', 'Weather', '$http', '$state'];
