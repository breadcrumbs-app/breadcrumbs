/*
 * This file contains all of the synchronous AJAX calls to our server.
 * 
 *
 *
 * Copyright 2015 Eric Chen, Genji Noguchi, Justin Kim
 *
 */

Breadcrumbs.createCrumb = function(data, url) {

    console.log("\n\nSending post request to " + Breadcrumbs.serverUrl + "/crumbs");
    console.log("Data: ");
    console.log(data);
    
    
    $.ajax({
	    
	url: url+"/crumbs",
	data: {"crumb": data},
	dataType: 'JSON', 
	type: 'POST',
	success: function(data) {
	    console.log("Data returned: "+data);
	    return data;
	},
	error: function() {
	    console.log("Error in createCrumb");
	},
	
    });

}
