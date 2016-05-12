angular.module('skyCast')
  .config(AppRouter);

  function AppRouter($stateProvider, $urlRouterProvider, $httpProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/templates/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'js/templates/login.html',
      })
      .state('signUp', {
        url: '/signup',
        templateUrl: 'js/templates/signup.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/templates/profile.html',
        data: {
          requiresLogin: true
        }
      })

  }
