WebMP.OnlineEntry = Ember.Object.extend({
    userID: 0,
    age: 0,
    pictureUrl: null,
    languageID: 0,
    
    //TODO: remove code overlapping
    fullPictureUrl: function () {
        var pictureUrl = this.get('pictureUrl');
        if (pictureUrl) {
            var languageID = this.get('languageID');
            var userID = this.get('userID');
            return WebMP.UrlManager.userEntryPicture(pictureUrl, languageID, userID);
        }
        var genderID = this.get('genderID');
        return genderID == 1
             ? WebMP.UrlManager.onlineListNoPictureMale
             : WebMP.UrlManager.onlineListNoPictureFemale;
    }.property(),

    profileUrl: function () {
        var userID = this.get('userID');
        return WebMP.UrlManager.profile(userID);
    }.property()
});

WebMP.OnlineEntry.reopenClass({
    make: function (obj) {
        return WebMP.OnlineEntry.create({
            userID: obj.userId,
            age: obj.age,
            pictureUrl: obj.pictureUrl,
            languageID: obj.language
        });
    }
});