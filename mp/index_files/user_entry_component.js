WebMP.UserEntryComponent = Ember.Component.extend(WebMP.Api, {
    isMenuShowed: false,

    isFavorite: Ember.computed.oneWay('entry.isFavorite'),
    favoriteChanged: function () {
    	this.send('toggleMenu');
    	var userID = this.get('entry.userID');
    	if(this.get('isFavorite')) {
    	    this.send('addFavorite', userID);
    	} else {
    	    this.send('removeFavorite', userID);
    	}
    }.observes('isFavorite'),

    isHidden: false,
    hiddenChanged: function () {
        var userID = this.get('entry.userID');
        if (this.get('isHidden')) {
            this.send('toggleMenu');
    	    this.send('addHidden', userID);
        } else {
    	    this.send('removeHidden', userID);
        }
    }.observes('isHidden'),

    actions: {
        toggleMenu: function () {
            this.toggleProperty('isMenuShowed');
        },
        cancelHiding: function () {
            this.toggleProperty('isHidden');
        },
        addFavorite: function(userID){
            this.getJSON(WebMP.UrlManager.api.addFavorite(userID))
        		['catch'](function (e) { console.log(e); });
        },
        removeFavorite: function(userID){
        	this.getJSON(WebMP.UrlManager.api.removeFavorite(userID))
        		['catch'](function (e) { console.log(e); });
        },
        addHidden: function(userID){
            this.getJSON(WebMP.UrlManager.api.addHidden(userID))
                ['catch'](function (e) { console.log(e); });
        },
        removeHidden: function(userID){
            this.getJSON(WebMP.UrlManager.api.removeHidden(userID))
                ['catch'](function (e) { console.log(e); });
        }
    }
});