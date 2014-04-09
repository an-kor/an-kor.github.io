WebMP.TextAdComponent = Ember.Component.extend({
	textad: WebMP.TextAd.create(),
	
	init: function () {
	    var that = this;
		this._super();
		var textad = this.get('textad');
	    WebMP.TextAd.fetch()
			        .then(function (ad) {
			            textad.setProperties(ad);
			            that.triggerElementLoadedEvent();
			        });
	},

	triggerElementLoadedEvent: function () {
	    var that = this;
        // trigger action that element is loaded (only root element may be inserted to the DOM at that moment)
	    this.sendAction();
	    Ember.run.scheduleOnce('afterRender', this, function () {
	        // Bind load handler to images after element is fully added to the DOM
            // This is required to properly calculate the height of scollable area for IScroller
	        Ember.$('#adcontainer img').off('load.mp').one('load.mp', function (e) {
	            that.sendAction();
	        });
	    });
	}.on('didInsertElement')
});