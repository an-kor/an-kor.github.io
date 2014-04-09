WebMP.ApplicationView = Ember.View.extend({
    didInsertElement: function () {
        Ember.$('#loader').remove();
        this.get('controller').send('initNavScroller');
        this.get('controller').send('initAsideScroller');
    }
});