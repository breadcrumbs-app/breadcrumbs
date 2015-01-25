/*
 * This file contains the Google Maps API implementation, including:
 *    - Defaults and constants.
 *    - The initialize() function.
 *    - Necessary callbacks.
 * 
 *
 *
 * Copyright 2015 Eric Chen, Genji Noguchi, Justin Kim
 *
 */

Breadcrumbs.maps = function() {

	var map,
		userMarker,
		defaultMarker = {
			animation: google.maps.Animation.DROP,
			draggable: true
		},
		currentLocation = {};




	function load() {
		google.maps.event.addDomListener(window, 'load', initialize);
	}




	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(
						40.724531899999995,
						-73.7971586),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		currentLocation = loadLocation( setMarker(userMarker), function(error){	
			switch(error.code) {
			case error.PERMISSION_DENIED:
				console.log("User denied permission.");
				break;
			case error.POSITION_UNAVAILABLE:
				console.log("Geolocation/GPS unavailable.");
				break;
			case error.TIMEOUT:
				console.log("Geolocation request timed out.");
				break;
			case error.UNKNOWN_ERROR:
				console.log("Something wack happened.");
				break;
			}
		});

	}

	function setMarker(marker){
		/*
		   var contentString = "<div class=\"align-center\"> <button class=\"align-center\" type=\"button\">Drop a Crumb</button> </div>"
		   var infowindow = new google.maps.InfoWindow({
		   content: contentString
		   });
		   */

		return function(latlng){
			var pos = new google.maps.LatLng(latlng.latitude, latlng.longitude);
			userMarker = new google.maps.Marker({
				map: map,
					   position: pos,
					   animation: defaultMarker.animation,
					   draggable: defaultMarker.draggable
			});
			map.panTo( userMarker.getPosition());

			google.maps.event.addListener( userMarker, 'clicked', function(){
				console.log("hello there");
				toggleBounce(userMarker);
				//infowindow.open(map, userMarker);
			})
			google.maps.event.addListener( userMarker, 'dragend', function(){
				map.panTo(userMarker.getPosition());
			});
		}
	};

	function loadLocation (callback, error) {
		if (navigator.geolocation) {
			console.log("loading location now...");
			navigator.geolocation.getCurrentPosition( function(pos){
				Breadcrumbs.maps.currentLocation['longitude'] = pos.coords.longitude;	
				Breadcrumbs.maps.currentLocation['latitude'] = pos.coords.latitude;

				console.log("\n\nLocation loaded: ");
				console.log(Breadcrumbs.maps.currentLocation);

				callback(Breadcrumbs.maps.currentLocation);
			}, error);
		}
	}


	return {
		map					: map,
		load				: load,
		userMarker			: userMarker,
		currentLocation		: currentLocation
	}

}();
