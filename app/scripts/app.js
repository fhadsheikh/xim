'use strict';

/**
 * @ngdoc overview
 * @name ximApp
 * @description
 * # ximApp
 *
 * Main module of the application.
 */
angular
.module('ximApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'pusher-angular',
    'ngScrollbars'
])
.config(function ($routeProvider, ScrollBarsProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    })
    .otherwise({
        redirectTo: '/'
    });
    ScrollBarsProvider
    .defaults = {
        theme:'minimal-dark',
        scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
        axis:'y'};

    
});