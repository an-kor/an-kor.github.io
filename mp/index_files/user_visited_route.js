WebMP.UserVisitedRoute = Ember.Route.extend(WebMP.Api, {
    model: function (params) {
        return this.getJSON(WebMP.UrlManager.api.visited())
                   .then(function (response) {
                        return WebMP.UserVisitors.make(response);
                 })['catch'](function(error) {
                        console.log(error);
                        return WebMP.UserVisitors.create();
                 });
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        // setup controller properties here to avoid triggering observer
        controller.set('isWithPictureOnly', model.get('filterOnlyPicturesEnabled'));
        controller.set('isGalleryView', model.get('filterGalleryViewEnabled'));

        // configure observers after initial values set
        controller.addObserver('isWithPictureOnly', controller.filterChanged);
        controller.addObserver('isGalleryView', controller.filterChanged);
    }
});