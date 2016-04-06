'use strict';

angular.module('sw.controllers')
.controller('DashController', function(ENV, WeatherService, $scope, $log, $timeout, $rootScope, $ionicPopup, $ionicLoading) {
  $log.log('Dash Controller');
  $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
      noBackdrop: false
  });

  var doService = function(){
    WeatherService.getData().success(function(data) {
      $ionicLoading.hide();
      $scope.data = data;
    }).error(function(data) {
      //添加失败
      $ionicLoading.hide();
    });
  };

  doService();
  $scope.doRefresh = function(){
    console.log('refresh....');
    doService();
    //Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  };
});
