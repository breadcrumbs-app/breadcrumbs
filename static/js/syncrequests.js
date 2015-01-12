/*
 * This file contains all of the synchronous AJAX calls to our server.
 * 
 *
 *
 * Copyright 2015 Eric Chen, Genji Noguchi, Justin Kim
 *
 */

function createCrumb( serverUrl, info) {
	$.ajax({
	url: serverUrl+"/crumbs",
	data: data,
	dataType: 'JSON', 
	type: 'POST',
	success: function(data) {
		console.log("Data returned: "+data);
	}
	error: function() {
			   console.log("Error in createCrumb");
		   },

	});
}
