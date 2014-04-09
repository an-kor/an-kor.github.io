WebMP.Api = Ember.Mixin.create({
    postJSON: function (url, data) {
        var settings = { url: url, type: 'POST', data: data };
        return this.ajax(settings);
    },
    getJSON: function (url) {
        var settings = { url: url, type: 'GET' };
        return this.ajax(settings);
    },
    ajax: function (settings) {
        settings.dataType = 'json';
        settings.contentType = 'application/json; charset=UTF-8';
        settings.headers = { 'Mp-ClientInfo': 'WebMP/0.1 (sv-SE)' };
        settings.dataFilter = function (data, type) {
            return data === '' ? null : data;
        };
        return Ember.RSVP.Promise.resolve(Ember.$.ajax(settings));
    }
});