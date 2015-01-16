/*
 * json format of crumb:
 * { latitude: latitude(float),
 *   longitude: longitude(float),
 *   message: message(string),
 *   user_id: user_id(int),
 *   name: name(string) }
 */

/*
 * returns crumbs based on the user's geolocation
 */
var getNearbyCrumbs = function() {
    return {crumbs: [{latitude: 1.2132131313, longitude: 1.13212321312, message: "hello", user_id: 11223213213, name: "rick"}]};
}

/*
 * parameters: crumbs - JSONArray of JSONObjects(crumbs)
 */
var insertCrumbsIntoPage = function(crumbs) {
    for (var i = 0; i < crumbs.length; i++) {
        // turn crumbs into html
        var html = convertCrumbToHtml(crumbs[i]);
        console.log(html);
        // append to specific DIV
        var crumbsDIV =  document.getElementById("cd-timeline");
        crumbsDIV.insertAdjacentHTML('beforeend', html);
    }
}

/*
 * parameters: crumb - JSONObject
 *
 * converts crumb information to be inserted into timeline
 */
var convertCrumbToHtml = function(crumb) {
    var html = "<div class=\"cd-timeline-block\">" +
                    "<div class=\"cd-timeline-img cd-location is-hidden\">" +
                        "<img src=\"../static/img/cd-icon-location.svg\" alt=\"Picture\">" +
                    "</div>"
    var contenthtml = "<div class=\"cd-timeline-content is-hidden\">" +
                    "<h2>" + crumb.name + "</h2>" +
                    "<p>" + crumb.message + "</p>" +
                    "<span class=\"cd-date\">" + "Jan 14" + "</span>" +
                "</div>";

    return html + contenthtml + "</div>";
}
