App.checkLocation = function(){
    var hash = window.location.hash, dealId;
    if (hash!='') {
        hash = hash.split('/');
        var showDeal = function(hash) {
            dealId = parseInt(hash[2],10);
            if (dealId) {
                if (Deals.loadedDeals[dealId]) {
                    Deals.showDeal(dealId);
                } else {
                    T.request('getdeal', function(data){
                        if (data.id) {
                            Deals.loadedDeals[data.id] = data;
                            Deals.showDeal(data.id);
                        }
                    }, {
                        dealId: dealId
                    });
                }
            }
        };
        for (var i in App.cities) {
            if (App.cities[i].id == hash[1]) {
                showDeal(hash);
            }
        }
        switch (hash[1]) {
            case "buy":
            case "deal":
                showDeal(hash);
            break;
            /*case "buy":
                dealId = hash[2];
                if (dealId) {
                    if (Deals.loadedDeals[dealId]) {
                        Deals.showBuyPage(dealId);
                    } else {
                        T.request('getdeal', function(data){
                            Deals.loadedDeals[data.id] = data;
                            Deals.showBuyPage(data.id);
                        }, {
                            dealId: dealId
                        });
                    }
                }
            break;*/
            case "search":
                App.showSearchPage();
                if (hash[2]){
                    App.searchDeal(hash[2]);
                }
            break;
            case "city":
                App.showChangeCityPage();
            break;
            case "mydeals":
                App.showMyDeals();
            break;
        }
    } else {
        if (App.pagesNumber == 2) {
            App.goBack();
        }
    }
};
App.goBack = function(ignoreSearch){
    var hash = window.location.hash;
    if (!ignoreSearch && hash.indexOf('search') > -1) {
        if (hash.indexOf('section') > -1) {
            App.searchDeal('');
            return false;
        }
    }
    clearInterval(App.countDownInterval);
    App.pagesScroll.scrollBy(T.w(),0,Styles.transitionTime);
    setTimeout(function(){
        var currentEl = T.byId('pages-current');
        currentEl.parentNode.removeChild(currentEl.parentNode.lastChild);
        App.pagesNumber--;
        if (App.pagesNumber == 1) {
            App.changeHash('');
        }
    },Styles.transitionTime);
    return true;
};
App.changeHash = function(value){
    App.hashChanged = 1;
    window.location.hash = value;
    setTimeout(function(){
        App.hashChanged = 0;
    }, 200);
};
App.hashChangeEvent = function(e){
    if (!App.hashChanged) {
        var oldURL = e.oldURL, newURL = e.newURL;
        oldURL = oldURL.substr(oldURL.indexOf('#'));
        newURL = newURL.substr(newURL.indexOf('#'));
        if(oldURL != '#') {
            oldURL = oldURL.split('/');
            newURL = newURL.split('/');
            if (oldURL[1] != "" && oldURL[1] != newURL[1]) {
                if (T.isIOS) {
                    if (oldURL[1] == "deal") {
                        Deals.hideSharePage();
                    }
                }
                App.goBack(true);
            } else {
                if (oldURL[1] == "search" &&  newURL[1] == "search" && oldURL[2] != '') {
                    App.searchDeal(newURL[2]);
                }
            }
        } else {
            App.changeHash('');
        }
    }
};