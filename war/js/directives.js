'use strict';

/* Directives */
angular.module("map-mcbjam", [])
.directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/map.html',
        link: function($scope, element, attrs) {
            
        	var center = new google.maps.LatLng(45.7603511, 4.886970099999985); 
        	$scope.map_options = {
                zoom: 5,
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            // create map
        	var map = new google.maps.Map(document.getElementById("map_canvas"), $scope.map_options);
        	var dirService= new google.maps.DirectionsService();
        	var dirRenderer= new google.maps.DirectionsRenderer()
            var dirContainer=document.getElementById('dir-container');

        	var showDirections = function(dirResult, dirStatus) {
                if (dirStatus != google.maps.DirectionsStatus.OK) {
                    //alert('Directions failed: ' + dirStatus);
                    return;
                  }
                  // Show directions
                dirRenderer.setMap(map);
                dirRenderer.setDirections(dirResult);
                dirRenderer.setPanel(dirContainer);
                $scope.fraisDeDep.kilometre=dirResult.routes[0].legs[0].distance.value/1000;
            };

            // Watch
            var updateMap = function(){
            	dirService.route($scope.master, showDirections); 
            };    
            $scope.$watch('master.origin', updateMap);
            $scope.$watch('master.destination', updateMap);

            google.maps.event.addListener(map, 'zoom_changed', function() {
            	$scope.map_options.zoom = map.getZoom();
            	$scope.$apply();
              });   
            
            google.maps.event.addListener(dirRenderer, 'routeindex_changed', 
            		function() { 
            	$scope.fraisDeDep.kilometre=dirRenderer.getDirections().routes[dirRenderer.getRouteIndex()].legs[0].distance.value/1000;
            });             
        }
    }
});