function MainController($scope) {
  $scope.master= {};

  calculateIndemniteKilometre = function() {
	  if($scope.fraisDeDep!=null)
		  {
		  if($scope.fraisDeDep.cv ==2)
		  {
			  return 0.20;
		  }
		  if($scope.fraisDeDep.cv ==3)
		  {
		  return 0.30;
		  }
		  if($scope.fraisDeDep.cv ==4)
		  {
		  return 0.31;
		  }
		  if($scope.fraisDeDep.cv ==5)
		  {
		  return 0.32;
		  }
		  if($scope.fraisDeDep.cv ==6)
			  return 0.35;
		  if($scope.fraisDeDep.cv ==7)
			  return 0.40;
		  }
	return 0.35;	
	};
  
  $scope.fraisDeDep ={
		  kilometre: 0,
		  indemniteKilometre: calculateIndemniteKilometre(),
		  cv:5,
		  allerretour: 1
  };
  calculateIndemniteKilometre();

	// calculate changes when one of the two variable changes.
	$scope.$watch('fraisDeDep.kilometer', function() {
		$scope.fraisDeDep.indemniteKilometre = calculateIndemniteKilometre();
	});

	$scope.$watch('fraisDeDep.cv', function() {
		$scope.fraisDeDep.indemniteKilometre = calculateIndemniteKilometre();
	});
  
  $scope.dirRequest = {
		      travelMode: google.maps.DirectionsTravelMode.DRIVING,
		      unitSystem: google.maps.DirectionsUnitSystem.METRIC ,
		      provideRouteAlternatives: true
		  };

  //Autocompletion
	var options = {
    	  componentRestrictions: {country: 'fr'}
    	};
	var autocomplete = new google.maps.places.Autocomplete(document.getElementById('dirRequest.origin'), options);    	
	 google.maps.event.addListener(autocomplete, 'place_changed', function() { 
		 $scope.dirRequest.origin=document.getElementById('dirRequest.origin').value;	 
		 $scope.master= angular.copy($scope.dirRequest);
		 $scope.$apply();
		});
	 var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('dirRequest.destination'), options);    	
	 google.maps.event.addListener(autocomplete2, 'place_changed', function() { 
		 $scope.dirRequest.destination=document.getElementById('dirRequest.destination').value;
		 $scope.master= angular.copy($scope.dirRequest);
		 $scope.$apply();
		});
  
	  // Try HTML5 geolocation
	 $scope.currentPos='Inconnu'
     if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            $scope.currentPos=pos;
          }, function() {
          });
       }
	 
  $scope.update = function() {
    $scope.master= angular.copy($scope.dirRequest);
  };

  //$scope.update();
}