/* /////////////////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////////////////
 * 
 * __________                            .___                        ___.           
 * \______   \_______   ____ _____     __| _/___________ __ __  _____\_ |__   ______
 *  |    |  _/\_  __ \_/ __ \\__  \   / __ |/ ___\_  __ \  |  \/     \| __ \ /  ___/
 *  |    |   \ |  | \/\  ___/ / __ \_/ /_/ \  \___|  | \/  |  /  Y Y  \ \_\ \\___ \ 
 *  |______  / |__|    \___  >____  /\____ |\___  >__|  |____/|__|_|  /___  /____  >
 *         \/              \/     \/      \/    \/                  \/    \/     \/ 
 *
 * /////////////////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////////////////
 * //////////////////////Copyright 2015 Team Breadcrumbs////////////////////////////
 * /////////////////////////////////////////////////////////////////////////////////
 * ////////////////Genji Noguchi, Justin Kim, Eric Chen/////////////////////////////
 * /////////////////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////////////////
 */

/* Globals */
var marker;
var currentLocation={};
var map;

/* Constants */
var defaultMarker = {
	animation: google.maps.Animation.DROP,
	draggable: true
};


$(document).ready( function(){
	google.maps.event.addDomListener(window, 'load', initialize);

	/*
	 *  Testing to see if the function works.
	 *  I'm delaying by x seconds in order to get the current location to load first.
	 */

	console.log(getSession());
	setTimeout(function(){
		createCrumb({
			latitude: currentLocation['latitude'],
			longitude: currentLocation['longitude'],
			timestamp: Date.now(),
			session: getSession()
		}, "")
	}, 10000);


});
