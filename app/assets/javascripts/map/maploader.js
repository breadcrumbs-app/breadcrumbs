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
		},
		currentLocation={},
		markerInfo = new google.maps.InfoWindow();

	function load() {
		$("#new-crumb-button").click(function(){
			console.log("Creating new breadcrumb: ");
		});
		google.maps.event.addDomListener(window, 'load', initialize);
	}

	function update() {
		Breadcrumbs.ajax.getCrumb( Breadcrumbs.url, function(data) {
			for (index in data['crumbs']) {
				setMarker()(data['crumbs'][index]);
			}
		})
	}
	
	function newCrumb() {
		var message = document.getElementById('new-crumb-message').value;
		if (!message) {
			if( !confirm("You haven't entered a message.\nAre you sure you want to procede?")) {
				return;
			}
		}

		Breadcrumbs.ajax.createCrumb({
			latitude: Breadcrumbs.maps.currentLocation['latitude'],
			longitude: Breadcrumbs.maps.currentLocation['longitude'],
			user_id: 12345,
			timestamp: Date.now(),
			message: message
		}, Breadcrumbs.url);
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

		currentLocation = loadLocation( function(data) {

			userMarker = setMarker({ draggable: true })(data);

			google.maps.event.addListener( userMarker, 'click', function() {
				var contentString = 
				"<div style='height: 100px;'>" + 
				"<center><h3>Drop a breadcrumb here?<h3><center>" + 
				"<input type='text' id='new-crumb-message'>" +
				"<button id='new-crumb-button' onclick='Breadcrumbs.maps.newCrumb()'>Drop Breadcrumb</button><br>" +
				"</center>" + 
				"</div>";

				markerInfo.setContent(contentString);
				markerInfo.open(map, userMarker);

				var button = document.getElementById('new-crumb-button');
				button.addEventListener('click', Breadcrumbs.maps.newCrumb);

				});

		}, function(error){	
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



	function setMarker(markerStyle){

		return function(data){
			var pos = new google.maps.LatLng(data.latitude, data.longitude);

			/* Define marker attributes (styles, etc) */
			var markerAttributes = {
				map: map,
				position: pos,
				data: data
			};
			for (var attr in defaultMarker) markerAttributes[attr] = defaultMarker[attr];
			for (var attr in markerStyle) markerAttributes[attr] = markerStyle[attr];


			var marker = new google.maps.Marker(markerAttributes);
			map.panTo( marker.getPosition() );			

			google.maps.event.addListener( marker, 'click', function(){
				var contentString = "<div class='crumb-window'>";
				if(data.hasOwnProperty('name')) {
					contentString += "<h1>username : "+data.name+"</h1>";
				}
				if(data.hasOwnProperty('user_id')) {
					contentString += "<h1>user id : "+data.user_id+"</h1>";
				}

				markerInfo.setContent(contentString);
				markerInfo.open( map, marker );
			});

			google.maps.event.addListener( marker, 'dragend', function(){
				map.panTo(userMarker.getPosition());
			});

			return marker;
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

	function getMap(){ return map; }
	function getUserMarker(){ return userMarker; }
	function getInfoWindow(){ return markerInfo; }

	return {
		getMap				: getMap,
		getUserMarker		: getUserMarker,
		getInfoWindow		: getInfoWindow,
		currentLocation		: currentLocation,
		load				: load,
		update				: update,
		newCrumb			: newCrumb
	}

}();
