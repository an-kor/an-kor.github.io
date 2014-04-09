WebMP.OnlineList = Ember.Object.extend({
    totalOnlineCount: 0,

    block1: null,
    hasBlock1Entries: Ember.computed.notEmpty('block1'),

    block2: null,
    hasBlock2Entries: Ember.computed.notEmpty('block2'),

    block3: null,
    hasBlock3Entries: Ember.computed.notEmpty('block3'),

    block4: null,
    hasBlock4Entries: Ember.computed.notEmpty('block4'),
});

WebMP.OnlineList.reopenClass(WebMP.Api, {
    make: function(obj) {
        return WebMP.OnlineList.create({
            totalOnlineCount: obj.onlineCount,
            block1: obj.sections[0] ? obj.sections[0].users.map(WebMP.OnlineEntry.make) : [],
            block2: obj.sections[1] ? obj.sections[1].users.map(WebMP.OnlineEntry.make) : [],
            block3: obj.sections[2] ? obj.sections[2].users.map(WebMP.OnlineEntry.make) : [],
            block4: obj.sections[3] ? obj.sections[3].users.map(WebMP.OnlineEntry.make) : []
        });
    },
    fetch: function () {
        var klass = this;
        return this.getJSON(WebMP.UrlManager.api.onlineList())
                    .then(function (response) {
                        return WebMP.OnlineList.make(response);
                  })['catch'](function (error) {
                        console.log(error);
                        return WebMP.OnlineList.create();
                  }).then(function (result) {
                        if (!klass.current) { klass.current = result; }
                        return result;
                    });
    },
    refresh: function () {
        var klass = this;
        var current = klass.current;
        return klass.fetch()
                    .then(function (update) {
                        Ember.run(function () {
                            current.setProperties(update);
                        });
                    });
    }
});