WebMP.UserVisited = Ember.Object.extend({
    visitCount: 0,
    userEntries: null,
    isLastPage: false,
    filterGalleryViewEnabled: false,
    filterOnlyPicturesEnabled: false
});

WebMP.UserVisited.reopenClass({
    make: function (obj) {
        return WebMP.UserVisited.create({
            visitCount: obj.visitCount,            
            userEntries: obj.visits.map(WebMP.UserEntry.make),
            isLastPage: obj.isLastPage,
            filterGalleryViewEnabled: obj.filterGalleryViewEnabled,
            filterOnlyPicturesEnabled: obj.filterOnlyPicturesEnabled,
            totalPages: Math.ceil(obj.visitCount / obj.filterGalleryViewEnabled ? 20 : 10)
        });
    }
});