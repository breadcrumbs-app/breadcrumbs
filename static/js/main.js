
//Constants
var marker;
var defaultMarker = {
	animation: google.maps.Animation.DROP,
	draggable: true
};

var currentLocation={};
var map;

$(document).ready( function(){
	google.maps.event.addDomListener(window, 'load', initialize);

	/*
	 *  Testing to see if the function works.
	 *  I'm delaying by 5 seconds in order to get the current location to load first.
	 */
	setTimeout(function(){
		createCrumb({
			latitude: currentLocation['latitude'],
			longitude: currentLocationp['longitude'],
			timestamp: Date.now(),
			session: getSession();
		}


});
