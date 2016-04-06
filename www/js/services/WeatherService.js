'use strict';

angular.module('sw.services')
.factory('WeatherService', function(ENV, ICONS, $log, $q, $http) {
  console.log('Weather Service');
  return {
          getData: function() {
            var d = $q.defer(),
                promise = d.promise;

            $http({
              url: ENV.api + '?city=' + ENV.city,
              method: 'GET',
              headers: {
                apiKey: ENV.apiKey
              }
            }).success(function(data) {
              var idx = 0,result = {};
              for(var i in data){
                if(idx == 0){
                  result = data[i][0];
                }
                idx++;
              }
              var suggestion = result.suggestion,
                  suggestions = [];
              for(var key in suggestion){
                suggestions.push({
                  brf: suggestion[key].brf,
                  txt: suggestion[key].txt
                });
              }
              result['now']['cond']['icon'] = ICONS[result['now']['cond']['code']][2];
              result['suggestions'] = suggestions;
              console.log(result);
              d.resolve(result);
            })
            .error(function(error) {
                d.reject(error);
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return d.promise;
          }
        }
});
