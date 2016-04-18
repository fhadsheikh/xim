'use strict';

/**
 * @ngdoc function
 * @name ximApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ximApp
 */
angular.module('ximApp')
.controller('CardsCtrl', function($scope,$pusher){
    
    
})
.controller('TechstatsCtrl', function($scope,$pusher){
    
    var client = new Pusher('2be55f84069c8f50ee29');
    var pusher = $pusher(client);
    
    var tix = pusher.subscribe('tix');
    
   
})
.controller('FeedCtrl', function($scope,$pusher){
    var client = new Pusher('2be55f84069c8f50ee29');
    var pusher = $pusher(client);
    
    var tix = pusher.subscribe('tix');
    
    tix.bind('comments2', function(data){
        $scope.Preview = data.Preview;
        $scope.feed.push({item:data.Name+'  '+data.Preview});
    });
    
    $scope.feed = []
    
})
.controller('TicketsCtrl', function($scope,$pusher,$http){

    
})
.controller('MainCtrl', function ($scope,$pusher,$http) {
    
    var height = $(window).height()-250;
    var feed = $(window).height()-600;
    
    $("#tickets").css("height", height);
    $("#feed").css("height", feed);
    
    /* CARDS */
    
    var client = new Pusher('2be55f84069c8f50ee29');
    var pusher = $pusher(client);
    
    var tix = pusher.subscribe('tix');
    
    tix.bind('tickets', function(data){
        
        $scope.stats = [
            {
                icon: 'fa fa-gears',
                number: data.open,
                label: 'Open Tickets'
            },
            {
                icon: 'fa fa-gears',
                number: data.unassigned,
                label: 'Unassigned'
            },
            {
                icon: 'fa fa-gears',
                number: data.critical,
                label: 'Critical'
            },
            {
                icon: 'fa fa-gears',
                number: data.stale,
                label: 'Stale'
            },
            {
                icon: 'fa fa-gears',
                number: data.opened,
                label: 'Opened'
            },
            {
                icon: 'fa fa-gears',
                number: data.closed,
                label: 'Closed'
            }
        ];
        
    });
    
    /* TICKETS */

    $http.get('http://localhost:8080/tsk/tickets/tickets')
    .success(function(res){
        console.log(res);
        $scope.tickets = res;
    })
    .error(function(err){
        
    });
    
    $scope.openTicket = function()
    {
        $scope.singleTicket = true;
    }
    
    $scope.backToList = function()
    {
        $scope.singleTicket = false;
    }
    
    $scope.filterList = function(label)
    {
        if(label == 'Open Tickets')
            {
                $scope.search = $scope.search.$;
            } else {
                
            $scope.search = label;  
            }
    }
    
    /* TECH STATS */
    
     tix.bind('techs', function(data){
        $scope.techs = data;
    });
    
});
