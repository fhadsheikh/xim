'use strict';

/**
 * @ngdoc function
 * @name ximApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ximApp
 */
angular.module('ximApp')
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
    
    var backToList = function()
    {
        $scope.singleTicket = false;
        $scope.assigning = false;
    }
    
    $scope.backToList = function()
    {
        backToList();
        $scope.ticketDetails = null;
    }
    
    $scope.filterList = function(label)
    {
        if($scope.assigning){
            swal({   title: "Assign ticket to "+label+"?",   text: "",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#5cc7b2",   confirmButtonText: "Yes, assign it!",   cancelButtonText: "No, cancel!",   closeOnConfirm: false,   closeOnCancel: false }, function(isConfirm){   if (isConfirm) {     swal("Assigned!", "Ticket has been assigned to "+label, "success");   } else {     swal("Cancelled", "Click another name to assign ticket to a tech.", "error");   } });
        } else {
            $scope.singleTicket = false;
            if(label == 'Open Tickets')
            {
                $scope.search = '';
            } else {
                $scope.search = label;  
            }
        }
        
    }
    
    /* TECH STATS */
    
     tix.bind('techs', function(data){
        $scope.techs = data;
    });
    
    /* TICKET */
    
    $scope.openTicket = function(ticket)
    {
        
        $scope.singleTicket = true;
        
        $scope.ticket = ticket;
        
        $http.get('http://localhost:8080/tsk/tickets/ticket?issueID='+ticket.issueId)
        .success(function(res1){
            $scope.ticketDetails = res1;
        })
        .error(function onError(err){
            console.log(err);
        });
        
        $http.get('http://localhost:8080/tsk/tickets/comments?issueID='+ticket.issueId)
        .success(function(res){
            $scope.comments = res;
        })
        .error(function(err){
            console.log(err);
        });
        
        
    }
    
    $scope.assignTo = function(ticket)
    {
        if($scope.assigning){
            $scope.assigning = false;
        } else {
            $scope.assigning = true;
        }
    }
    
    
})