
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




});
