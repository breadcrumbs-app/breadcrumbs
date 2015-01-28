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
		Breadcrumbs.ajax.getCrumb( Breadcrumbs.url + '/crumbs',
			function(data) {
				console.log(data);
				for (index in data) {
					console.log(data[index]);
					setMarker()(data[index]);
				}
			}, function(err) {
				console.log(err);
				Breadcrumbs.messages.createNotification({
					message: "There was an error",
					timeout: 3000
				})
			}
		)
	}
			
	
	function newCrumb() {
		var message = document.getElementById('new-crumb-message').value;
		if (!message) {
			if( !confirm("You haven't entered a message.\nAre you sure you want to proceed?")) {
				return;
			}
		}
		
		markerInfo.close();

		/*
		Breadcrumbs.messages.createNotification({
			message: "Dropping breadcrumb....",
			timeout: 3000
		});
		*/

		Breadcrumbs.ajax.createCrumb({
			latitude: Breadcrumbs.maps.currentLocation['latitude'],
			longitude: Breadcrumbs.maps.currentLocation['longitude'],
			timestamp: Date.now(),
			message: message
		}, Breadcrumbs.url,
		function(data){
			Breadcrumbs.messages.createNotification({
				message: "Crumb successfully created!",
				timeout: 3000	
			})
		}, function(err){
			Breadcrumbs.messages.createNotification({
				message: "There was an error.",
				timeout: 3000
			})
		})
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
			var strerror;
			switch(error.code) {
			case error.PERMISSION_DENIED:
				strerror="User denied permission.";
				break;
			case error.POSITION_UNAVAILABLE:
				strerror = "Geolocation/GPS unavailable.";
				break;
			case error.TIMEOUT:
				strerror = "Geolocation request timed out.";
				break;
			case error.UNKNOWN_ERROR:
				strerror = "Something wack happened.";
				break;
			}

			Breadcrumbs.messages.createNotification({
				messsage: strerror,
				timeout: 3000
			});
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
				contentString += "<h1>"+data.author.name+"</h1>";
				contentString += "<p>" + data.message + "</p";
				contentString += "</div>";

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
			Breadcrumbs.messages.setNotification("Loading location now...");
			navigator.geolocation.getCurrentPosition( function(pos){
				Breadcrumbs.maps.currentLocation['longitude'] = pos.coords.longitude;	
				Breadcrumbs.maps.currentLocation['latitude'] = pos.coords.latitude;

				Breadcrumbs.messages.createNotification({
					message: "Location loaded.",
					timeout: 3000,
				});
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
