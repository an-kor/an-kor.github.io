WebMP.UserVisitedController = Ember.ObjectController.extend(WebMP.Api, {
    needs: ['application'],

    isMenuShowed: false,
    isWithPictureOnly: false,
    isGalleryView: false,
    previousPageEntry: null,
    loading: false,
    updateSettings: false,

    hasMore: function() {
        var isLastPage = this.get('isLastPage');
        var loading = this.get('loading');
        var result = !(isLastPage || loading);
        Em.$('#next-page-btn').attr('disabled', !result);
        return result;
    }.property('isLastPage', 'loading'),

    lastEntryDate: function () {
        var entries = this.get('userEntries');
        if(!entries.get('length')){
            return null;
        }
        return entries.sortBy('entryDate').get('firstObject').entryDate;
    }.property('userEntries.@each'),

    filterChanged: function () {
        this.set('updateSettings', true)
        this.send('reloadData');
    }, //observer is set up dynamically in user_visitors_route

    dataUrl: function() {
        return WebMP.UrlManager.api.visited(this.get('lastEntryDate'), this.get('isGalleryView'), this.get('isWithPictureOnly'), this.get('updateSettings'));
    }.property('lastEntryDate', 'isGalleryView', 'isWithPictureOnly', 'updateSettings'),

    actions: {
        toggleSidebar: function () {
            $('#site').toggleClass('active-sidebar');
            this.get('controllers.application').refreshNavScroller();
        },
        toggleMenu: function () {
            this.toggleProperty('isMenuShowed');
            if (this.get('isMenuShowed')) {
                Ember.run.next(this, function () {
                    var self = this;
                    Ember.$(document).one('click', function () {
                        self.set('isMenuShowed', false);
                    });
                });
            }
        },
        reloadData: function () {
            var self = this;
            var timer = Ember.run.later(this, function() {
                this.set('loading', true);
            }, 100);
            this.get('userEntries').clear();
            this.getJSON(this.get('dataUrl'))
                .then(function (data) {
                    Ember.run.cancel(timer);
                    self.set('loading', false);
                    self.set('isLastPage', data.isLastPage);
                    self.set('updateSettings', false);
                    self.get('userEntries').pushObjects(data.visits.map(WebMP.UserEntry.make));
              })['catch'](function (e) { console.log(e); });
        },
        loadMore: function () {
            var self = this;
            if(!this.get('hasMore')) { return; }
            this.set('loading', true);
            this.getJSON(this.get('dataUrl'))
                .then(function (data) {
                    self.set('loading', false);
                    self.set('isLastPage', data.isLastPage);
                    self.set('updateSettings', false);
                    self.get('userEntries').pushObjects(data.visits.map(WebMP.UserEntry.make));
              })['catch'](function (e) { console.log(e); });
        }
    }
});