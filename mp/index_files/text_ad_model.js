WebMP.TextAd = Ember.Object.extend({
	text: null
});

WebMP.TextAd.reopenClass(WebMP.Api, {
	make: function(obj) {
		return WebMP.TextAd.create({
			text: obj.text
		});
	},
    fetch: function() {
        return this.getJSON(WebMP.UrlManager.api.textad())
                   .then(function(response) {
                       return WebMP.TextAd.make(response);
                 })['catch'](function(error) {
                       console.log(error);
                       return WebMP.TextAd.create();
               });
    }
});