window.WebMP = Ember.Application.create({
    //LOG_TRANSITIONS: true,
    //LOG_TRANSITIONS_INTERNAL: true,
    //LOG_VIEW_LOOKUPS: true,
    //LOG_ACTIVE_GENERATION: true,

    ready: function () {
        Ember.$(window).on('hashchange', function () {
            var hash = window.location.hash;
            var path = hash.slice(2, hash.length);
            if (dataLayer) {
                dataLayer.push({
                    'event': 'pageview',
                    'virtualUrl': path // That is actually a question what path should be here
                });
            }
        });
        Ember.$.ajaxSetup({
            error: function (xhr) {
                if (xhr.status === 401) {
                    window.location.replace('/');
                }
            }
        });
    }
});
