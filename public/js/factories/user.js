'use strict';

function User($http) {

//private variables and functions
  let currentUser = {};
  let loginState = false;

  return {
    verifyToken: function() {

    },

    setCurrentUser: function(user) {
      currentUser = user;
    },

    getCurrentUser: function() {
      return currentUser;
    },

    setUserForLogin: function(user) {
      userForLogin = user;
    },

    getUserForLogin: function() {
      return userForLogin;
    },

    setLoginState: function(newState) {
      loginState = newState;
    },

    getLoginState: function() {
      return loginState;
    },

    getQueries: function() {
      return currentUser.queries;
    },

    addQuery: function(query) {
      if (currentUser.queries.indexOf(query) === -1) {
        //apply change only if the query does not already exist in the array
        currentUser.queries.push(query);
      }
    },

    removeQuery: function(query) {
      let queryIndex = currentUser.queries.indexOf(query);
      if (index > -1) {
        currentUser.queries.splice(queryIndex, 1);
      }
    }

  }
}
