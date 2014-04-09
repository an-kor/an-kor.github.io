WebMP.Pollster = Ember.Object.extend({
    start: function (interval) {
        this.timer = setInterval(this.onPoll, interval);
    },
    stop: function () {
        clearInterval(this.timer);
    },
    onPoll: function () {
    }
});
