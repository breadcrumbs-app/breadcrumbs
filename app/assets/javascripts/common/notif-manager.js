Breadcrumbs.messages = function() {

	/*
	 * Fades in the notification block and sets the notification message.
	 * The message persists indefinitely until another notification replaces it.
	 *
	 */
	function setNotification( message ) {
		var notif = $("#notification");
		var notifmessage = $("#notification-message");
		var editmessage = document.getElementById("notification-message");

		editmessage.innerHTML = message;
		notifmessage.fadeIn();
		notif.fadeIn();
	}

	/*
	 * Creates a single notification.
	 * notification object: {
	 * 		message: Notification message
	 * 		timeout: TTL for message.
	 * }
	 */
	function createNotification( notification ) {
		var notif = $("#notification");
		var notifmessage = $("#notification-message");
		var editmessage = document.getElementById("notification-message");

		editmessage.innerHTML = notification.message;
		notifmessage.fadeIn();
		notif.fadeIn();
		setTimeout( function() {
			notif.fadeOut();
			notifmessage.fadeOut();
			editmessage.innerHTML = ".......................";
		}, notification.timeout );
	}

	/*
	 * Takes in two js objects.
	 * loading: {
	 * 		message: First message,
	 * 		timeout: TTL for loading message
	 * }
	 *
	 * complete: {
	 *		message: Completion message,
	 *		timeout: TTL for completion message
	 */
function loadingNotification( loading, complete ) {
	var notif = $("#notification");
	var notifmessage = $("#notification-message");
	var editmessage = document.getElementById("notification-message");

	editmessage.innerHTML = loading.message;
	notifmessage.fadeIn();
	notif.fadeIn();
	setTimeout( function() {
		notifmessage.fadeOut();
		editmessage = complete.message;
		notifmessage.fadeIn();
	}, loading.timeout);

	setTimeout( function() {
		notifmessage.fadeOut();
		editmessage = "";
	}, complete.timeout);
}


return {

	setNotification			: setNotification,
	createNotification		: createNotification

}
}();
