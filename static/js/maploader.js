var marker;
var latlng = {};
var map

function initialize() {
    var mapOptions = {
		center: new google.maps.LatLng(
		    40.724531899999995,
		    -73.7971586),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    marker = new google.maps.Marker({
		map: map,
		draggable: true
	})

    latlong = loadLocation(map);

}
google.maps.event.addDomListener(window, 'load', initialize);



function loadLocation (){

	function getLocation(pos){
		latlng["latitude"] = pos.coords.latitude;
		latlng["longitude"] = pos.coords.longitude;
		setMarker();
	}

	var load = function() {
		if (navigator.geolocation) {
			console.log("Loading location now....");
		    navigator.geolocation.getCurrentPosition(getLocation, function(error){	
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
	}();

	function setMarker(){
		console.log(latlng);
		var pos = new google.maps.LatLng(latlng.latitude, latlng.longitude);
		marker = new google.maps.Marker({
			map: map,
		    position: pos,
		    animation: google.maps.Animation.DROP,
		    draggable: true
		});
		map.panTo(marker.getPosition());
	};

};
