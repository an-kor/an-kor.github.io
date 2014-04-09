WebMP.NotificationTextsComponent = Ember.Component.extend(WebMP.Api, {
	notifications: Ember.A(),

	init: function () {
		this._super();
		var current = this.get('notifications');
		WebMP.NotificationText.fetch()
			.then(function (notifications) {
				notifications.forEach(function (e) {
					current.pushObject(e);
				});
			});
	}
});