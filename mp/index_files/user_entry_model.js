WebMP.UserEntry = Ember.Object.extend({
    userID: 0,
    userName: null,
    age: 0,
    languageID: 0,
    genderID: 0,
    seeksAgeFrom: 0,
    seeksAgeTo: 0,
    seeksGenderID: 0,
    location: null,
    userIntro: null,
    badge: false,
    entryDate: null,
    pictureUrl: null,
    isFavorite: false,
    isOnline: false,
    vipstatus: 0,

    userInfo: function() {
        var age = this.get('age');
        var location = this.get('location');
	    return Ember.I18n.t('user_entry.geo.location', { age: age, location: location });
    }.property(),

    userSeeks: function() {
        var ageTo = this.get('seeksAgeTo');
        var ageFrom = this.get('seeksAgeFrom');
        var genderID = this.get('seeksGenderID');
        var gender = genderID == 1 ? Ember.I18n.t('user_entry.seeks.gender.man') : Ember.I18n.t('user_entry.seeks.gender.woman');
        return Ember.I18n.t('user_entry.seeks.short', { seekssex: gender, seeksagefrom: ageFrom, seeksageto: ageTo });
    }.property(),

    entryDateFormat: function() {
        return moment(this.get('entryDate')).fromNow();
    }.property(),

    //TODO: remove code overlapping
    fullPictureUrl: function() {
        var pictureUrl = this.get('pictureUrl');
        if(pictureUrl) {
            var languageID = this.get('languageID');
            var userID = this.get('userID');
            return WebMP.UrlManager.userEntryPicture(pictureUrl, languageID, userID);
        }
        var genderID = this.get('genderID');
        return genderID == 1
             ? WebMP.UrlManager.userEntryNoPictureMale
             : WebMP.UrlManager.userEntryNoPictureFemale;
    }.property(),

    profileUrl: function() {
        var userID = this.get('userID');
        return WebMP.UrlManager.profile(userID);
    }.property(),

    vip: function () {
        return this.get('vipstatus') == 1;
    }.property(),

    vipplus: function () {
        return this.get('vipstatus') == 2;
    }.property(),
});

WebMP.UserEntry.reopenClass({
    make: function(obj) {
        return WebMP.UserEntry.create({
            userID: obj.userId,
            userName: obj.username,
            age: obj.age,
            languageID: obj.language,
            genderID: obj.sex,
            seeksAgeFrom: obj.seeksAgeFrom,
            seeksAgeTo: obj.seeksAgeTo,
            seeksGenderID: obj.seeksSex,
            location: obj.location,
            userIntro: obj.text,
            badge: obj.badge,
            entryDate: obj.entryDate,
            pictureUrl: obj.pictureUrl,
            isFavorite: obj.isFavorite,
            isOnline: obj.isOnline,
            vipstatus: obj.vipstatus
        });
    }
});