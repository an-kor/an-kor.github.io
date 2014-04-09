WebMP.UrlManager = function (modernizr) {
    var self = {};

    var host = window.location.host;

    var staticHost = function () {
        var match = /(.+?)\.(.+)/.exec(host);
        return 'static.' + match[2];
    }();

    var lang = moment.lang() == 'sv' ? 'sv-se' : 'nb-no';

    var imgExtension = modernizr.svg ? 'svg' : 'png';

    self.menuLogo = function () {
        return '//%@/images/layout/menu_logo_%@.%@'.fmt(staticHost, lang, imgExtension);
    }();

    self.userEntryNoPictureMale = function () {
        return '//%@/images/layout/no_picture/avatar_male.%@'.fmt(staticHost, imgExtension);
    }();

    self.userEntryNoPictureFemale = function () {
        return '//%@/images/layout/no_picture/avatar_female.%@'.fmt(staticHost, imgExtension);
    }();

    self.onlineListNoPictureMale = function () {
        return '//%@/images/layout/no_picture/avatar_female_90x120.png'.fmt(staticHost);
    }();

    self.onlineListNoPictureFemale = function () {
        return '//%@/images/layout/no_picture/avatar_female_90x120.png'.fmt(staticHost);
    }();

    self.profile = function (userID) {
        return '//%@/pages/user.aspx?userId=%@'.fmt(host, userID);
    };

    self.userEntryPicture = function (fileName, languageID, userID) {
        var parts = fileName.split(".");
        var name = parts[0];
        var extension = parts[1];
        return '//%@/userpicture/%@_%@_%@_%@_%@.%@'.fmt(staticHost, name, 360, languageID, userID, 0, extension);
    };

    self.api = {
        menu: function() {
            return '/api/v1/menu';
        },
        onlineList: function() {
            return '/api/v1/onlinelist';
        },
        visitors: function (lastEntryDate, isGalleryView, isWithPictureOnly, saveFilterSettings) {
            lastEntryDate = lastEntryDate || 0;
            var pageSize = isGalleryView ? 20 : 10;
            isWithPictureOnly = isWithPictureOnly || false;
            isGalleryView = isGalleryView || false;
            saveFilterSettings = saveFilterSettings || false;
            return '/api/v1/visit/visits?pageFromEntryDate=%@&pageSize=%@&onlyMembersWithPhoto=%@&galleryView=%@&saveFilterSettings=%@'.fmt(lastEntryDate, pageSize, isWithPictureOnly, isGalleryView, saveFilterSettings);
        },
        visited: function (lastEntryDate, isGalleryView, isWithPictureOnly, saveFilterSettings) {
            lastEntryDate = lastEntryDate || 0;
            var pageSize = isGalleryView ? 20 : 10;
            isWithPictureOnly = isWithPictureOnly || false;
            isGalleryView = isGalleryView || false;
            saveFilterSettings = saveFilterSettings || false;
            return '/api/v1/visit/visited?pageFromEntryDate=%@&pageSize=%@&onlyMembersWithPhoto=%@&galleryView=%@&saveFilterSettings=%@'.fmt(lastEntryDate, pageSize, isWithPictureOnly, isGalleryView, saveFilterSettings);
        },
        addFavorite: function(userID) {
            return '/api/v1/favorite/add/%@'.fmt(userID);
        },
        removeFavorite: function(userID) {
            return '/api/v1/favorite/remove/%@'.fmt(userID);
        },
        addHidden: function(userID) {
            return '/api/v1/hidden/add/%@'.fmt(userID);
        },
        removeHidden: function(userID) {
            return '/api/v1/hidden/remove/%@'.fmt(userID);
        },
        textad: function()
        {
	        return '/api/v1/textad';
        },
        notifications: function (currentPage) {
        	return '/api/v1/notifications?currentPage=%@'.fmt(currentPage);
        }
    };

    return self;
}(Modernizr);