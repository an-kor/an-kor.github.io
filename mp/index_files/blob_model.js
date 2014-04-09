WebMP.Blob = Ember.Object.extend({
    newMessagesCount: 0,
    hasNewMessages: Ember.computed.gt('newMessagesCount', 0),

    newDatesCount: 0,
    hasNewDates: Ember.computed.gt('newDatesCount', 0),

    newPhotosCount: 0,
    hasNewPhotos: Ember.computed.gt('newPhotosCount', 0),

    newVisitorsCount: 0,
    hasNewVisitors: Ember.computed.gt('newVisitorsCount', 0),

    newMembersCount: 0,
    hasNewMembers: Ember.computed.gt('newMembersCount', 0),

    hasProfilePicture: false,
    paidVipUntil: null,
    vipTimeLeftStatus: 0,

    showVipOffer: Ember.computed.equal('vipTimeLeftStatus', 0),
    showVipSoonOver: Ember.computed.equal('vipTimeLeftStatus', 1),
    showSingleVipDayLeft: Ember.computed.equal('vipTimeLeftStatus', 2),
    showVipDaysLeft: Ember.computed.equal('vipTimeLeftStatus', 3),
    showIsVip: Ember.computed.equal('vipTimeLeftStatus', 4),

    vipDaysLeft: function () {
        return moment(this.get('paidVipUntil')).diff(moment(), 'days');
    }.property('paidVipUntil')
});

WebMP.Blob.reopenClass(WebMP.Api, {
    make: function (obj) {
        return WebMP.Blob.create({
            newMessagesCount: obj.newMessages,
            newDatesCount: obj.newDates,
            newPhotosCount: obj.newPhotos,
            newVisitorsCount: obj.newVisitors,
            newMembersCount: obj.newMembers,
            hasProfilePicture: obj.hasProfilePicture,
            paidVipUntil: obj.paidVipUntil,
            vipTimeLeftStatus: obj.vipTimeLeftStatus
        });
    },
    fetch: function () {
        var klass = this;
        return this.getJSON(WebMP.UrlManager.api.menu())
                   .then(function (response) {
                       return WebMP.Blob.make(response);
                 })['catch'](function (error) {
                     console.log(error);
                     return WebMP.Blob.create();
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