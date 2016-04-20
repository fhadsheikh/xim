'use strict';

/**
 * @ngdoc filter
 * @name ximApp.filter:trim
 * @function
 * @description
 * # trim
 * Filter in the ximApp.
 */
angular.module('ximApp')
  .filter('trim', function () {
    return function (input) {
        if(input.length >= 100){
            return input.substring(0,100)+'...';
        }
      return input;
    };
  });
