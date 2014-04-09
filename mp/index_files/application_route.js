WebMP.ApplicationRoute = Ember.Route.extend({
    redirect: function () {
        if (!location.hash.length) {
            this.transitionTo('/user_visitors');
        }
    },
    model: function () {
        var blob = WebMP.Blob.fetch();
        var onlineList = WebMP.OnlineList.fetch();
        return Ember.RSVP.Promise.all([blob, onlineList])
                         .then(function (values) {
                             return Ember.Object.create({
                                 blob: values[0],
                                 onlineList: values[1]
                             });
                         });
    },
    activate: function () {
        var that = this;
        this.appPollster = WebMP.Pollster.create({
            onPoll: function () {
                WebMP.Blob.refresh();
                var e = Ember.$('#divBlockContainer');
                e.animate({ opacity: 0 }, 300, function () {
                    WebMP.OnlineList.refresh().then(function () {
                        e.animate({ opacity: 1 }, 600, function () {
                            that.controllerFor('application').refreshAsideScroller();
                        });
                    });
                });
            }
        });
        this.appPollster.start(30000);
    },
    deactivate: function () {
        this.appPollster.stop();
    }
});