'use strict';

/**
 * @ngdoc filter
 * @name ximApp.filter:reverse
 * @function
 * @description
 * # reverse
 * Filter in the ximApp.
 */
angular.module('ximApp')
  .filter('reverse', function () {
    return function (items) {
      return items.slice().reverse();
    };
  });
