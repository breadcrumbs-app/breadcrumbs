/*
 * Manipulation with the web app's cookies.
 * The javascript code isn't doing anything to handle the cookies; rather, it's simply retrieving the encrypted cookie information.
 * Our app uses the Rails session manager to manage our session.
 *
 * NOTE
 * For the future, change this to use an XMLHTTPRequest to request cookies in order to maintain the security of cookies using HTTPOnly.
 */

/*
 * Gets the encrypted session blob
 * The name of the cookie should be _breadcrumbs_session.
 */
function getSession() {
	var session="";

	/* retrieve the cookie using regex. Regex still needs work */
	var test = /^_breadcrumbs_session=\w+$/;
	session = test.exec(document.cookie);

	return session;
}
