WebMP.NotificationText = Ember.Object.extend({
	text: null
});

WebMP.NotificationText.reopenClass(WebMP.Api, {
	make: function(obj)
	{
		return WebMP.NotificationText.create({
			text: obj
		});
	},
	fetch: function()
	{
		var hash = window.location.hash;
		var startPosition = 2;
		var endPosition = hash.indexOf("/", startPosition);

		if(endPosition == -1)
			endPosition = hash.length;

		var path = hash.slice(startPosition, endPosition);
		
		return this.getJSON(WebMP.UrlManager.api.notifications(path))
				   .then(function (response) {
						return response.notificationTexts.map(WebMP.NotificationText.make);
				 })['catch'](function (error) {
				   		console.log(error);
				   		return Ember.A();
				   });
	}
});