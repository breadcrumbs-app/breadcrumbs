/*
 * This file contains all of the synchronous AJAX calls to our server.
 *
 *
 *
 * Copyright 2015 Eric Chen, Genji Noguchi, Justin Kim
 *
 */

Breadcrumbs.ajax = (function() {

    var createCrumb = function(data, url) {

        console.log("\n\nSending post request to " + Breadcrumbs.url + "/crumbs/new");
        console.log("Data: ");
        console.log(data);


        $.ajax({

            url: url+"/crumbs/new",
            data: {"crumb": data},
            dataType: 'JSON',
            type: 'POST',
            success: function(response) {
                console.log("Data returned: "+response);
                return response;
            },
            error: function() {
                console.log("Error in createCrumb");
            }

        });

    }

    var getCrumb = function(url, callback) {

        console.log(url);

		/*
        $.ajax({

            url: url,
            data: null,
            dataType: 'json',
            type: 'GET',
            success: function(resp) {
                console.log(resp);
                callback(resp);
            },
            error: function() {
                console.log("Error");
            }

        });
		*/

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

    }


    return {
        createCrumb: createCrumb,
        getCrumb: getCrumb
    };
}());
