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

        console.log("\n\nSending post request to " + Breadcrumbs.serverUrl + "/crumbs");
        console.log("Data: ");
        console.log(data);


        $.ajax({

            url: url+"/crumbs",
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

    var getCrumb = function(url) {

        console.log(url);
        $.ajax({

            url: url+"/crumbs",
            dataType: 'JSON',
            type: 'GET',
            success: function(resp){
                console.log("Data returned: "+resp);
                return data;
            },
            error: function() {
                console.log("Error");
            }

        });
    }

    return {
        createCrumb: createCrumb,
        getCrumb: getCrumb
    };
}());
