'use strict';

angular.module('sw', ['ionic', 'sw.config', 'sw.controllers'])

.run(function($ionicPlatform, $log, $timeout, $state, $rootScope, ENV) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }

    //判断网络状态
    document.addEventListener("deviceready", function() {
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
          var onlineState = networkState;
          console.log("device online...");
      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          var offlineState = networkState;
          //提醒用户的网络异常
          $ionicLoading.show({
              template: '网络异常，不能连接到服务器！'
          });
      })
    }, false);

  });
})
.config(function(ENV, $stateProvider, $urlRouterProvider, $logProvider) {
  $logProvider.debugEnabled(ENV.debug);
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'index.html',
      controller: 'AppController'
    })
    .state('app.dash', {
      url: '/dash',
      cache: false,
      templateUrl: 'templates/dash.html',
      controller: 'DashController'
    });

  $urlRouterProvider.otherwise('/app/dash');
});

angular.module('sw.controllers', ['sw.services']);
angular.module('sw.services', ['sw.config']);
