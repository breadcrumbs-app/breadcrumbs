/*
 * json format of crumb:
 * { latitude: latitude(float),
 *   longitude: longitude(float),
 *   message: message(string),
 *   user_id: user_id(int),
 *   name: name(string) }
 */

/*
 * xmlhttp = new XmlHTTPRequest();
 * xmlhttp.open("GET", "http://bc.jstn.kim:3000/crumbs/mine", true);
 * xmlhttp.setRequestHeader("Accept", "application/json");
 * xmlhttp.send();
 * xmlhttp.responseText;
 * JSON.parse(xmlhttp.responseText);
 */

/*
 * handles all timeline animations and ajax functions
 */
Breadcrumbs.timeline = (function timeline() {
    /*
     * part of library vertical-timeline
     * http://codyhouse.co/demo/vertical-timeline/
     */

    var $timeline_block = $('.cd-timeline-block');

    jQuery(document).ready(function($){

        //hide timeline blocks which are outside the viewport
        $timeline_block.each(function(){
            if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            }
        });

        // animate timeline blocks in viewport that start out as hidden
        $timeline_block.each(function(){
            if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });

        //on scrolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function(){
            $timeline_block.each(function(){
                if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                }
            });
        });
    });

    /*
     * returns crumbs based on the user's geolocation
     */
    var getNearbyCrumbs = function() {
        return {crumbs: [{latitude: 1.2132131313, longitude: 1.13212321312, message: "hello", user_id: 11223213213, name: "rick"}]};
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
            "<h2>" + crumb.user_id + "</h2>" +
            "<p>" + crumb.message + "</p>" +
            "<span class=\"cd-date\">" + crumb.updated_at + "</span>" +
            "</div>";

        console.log(html + contenthtml + "</div>");
        return html + contenthtml + "</div>";
    }

    /*
     * parameters: crumbs - JSONArray of JSONObjects(crumbs)
     */
    var insertCrumbsIntoPage = function(crumbs) {
        for (var i = 0; i < crumbs.length; i++) {
            // turn crumbs into html
            var html = convertCrumbToHtml(crumbs[i]);
            // append to specific DIV
            var crumbsDIV =  document.getElementById("cd-timeline");
            crumbsDIV.insertAdjacentHTML('beforeend', html);
        }
        $timeline_block = $('.cd-timeline-block');
    }


    return {
        getNearbyCrumbs: getNearbyCrumbs,
        convertCrumbToHtml: convertCrumbToHtml,
        insertCrumbsIntoPage: insertCrumbsIntoPage
    };
}());

Breadcrumbs.ajax.getCrumb("http://bc.jstn.kim:3000/crumbs", Breadcrumbs.timeline.insertCrumbsIntoPage);
