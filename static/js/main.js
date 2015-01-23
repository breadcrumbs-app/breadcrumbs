$(document).ready( function() {	
	console.log(Breadcrumbs);
	Breadcrumbs.maps.load();
	//Breadcrumbs.load();
	//Google.maps.event.addDomListener(window, 'load', initialize);
	

	/*
	 *  Testing to see if the function works.
	 *  I'm delaying by x seconds in order to get the current location to load first.
	 */

	console.log(getSession());
	setTimeout(function(){
		Breadcrumbs.createCrumb({
			latitude: Breadcrumbs.maps.currentLocation['latitude'],
			longitude: Breadcrumbs.maps.currentLocation['longitude'],
			timestamp: Date.now(),
			user_id: 1
		}, Breadcrumbs.url)
	}, 10000);


});
