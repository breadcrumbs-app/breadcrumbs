/*
 * This file contains all of the synchronous AJAX calls to our server.
 *
 *
 *
 * Copyright 2015 Eric Chen, Genji Noguchi, Justin Kim
 *
 */

Breadcrumbs.ajax = (function() {

    var createCrumb = function(data, url, success, error) {

        console.log("\n\nSending post request to " + Breadcrumbs.url + "/crumbs/new");
        console.log("Data: ");
        console.log(data);


        $.ajax({
            url: url+"/crumbs/new",
            data: {"crumb": data},
            dataType: 'JSON',
            type: 'POST',
            success: success,
			error: error
        });

    }

    var getCrumb = function(url, success, error) {

        console.log(url);
	
        $.ajax({
            url: url,
            data: null,
            dataType: 'json',
            type: 'GET',
            success: success,
			error: error
        });
	
		/*
		callback({
			'crumbs': [
			{
				'latitude': 40.7244193 + (Math.random()*0.005)-0.01,
				'longitude': -73.7972479 + (Math.random()*0.005)-0.01,
				'message': "This is a test breadcrumb.",
				'user_id': 12345,
				'name': 'Juenjic Cheguchim'
			}
			]
		});
		*/

    }


    return {
        createCrumb: createCrumb,
        getCrumb: getCrumb
    };
}());
