'use strict';

angular.module('sw.controllers')
.controller('AppController', function(ENV, $scope, $log, $timeout, $rootScope, $ionicPopup, $ionicLoading) {
  $log.log('App Controller');
  // environment config
  $scope.ENV = ENV;
  // ionic platform
  $scope.platform = ionic.Platform;

});
