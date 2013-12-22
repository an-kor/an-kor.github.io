var App = {
    pagesNumber: 1,
    isDealsLoading: 0,
    inTransition: 0,
    showIFrame:function(title, src){
        if (App.addPage()) {
            var currentEl, newEl;
            currentEl = T.byId('pages-current');
            newEl = document.createElement("div");
            newEl.id = "pages-iframe";
            newEl.style.width = T.w()+'px';
            var template = T.byId('iframe-page-template').innerHTML;
            template = template.replace('%TITLE%', title);
            template = template.replace('src=""', 'src="'+src+'"');
            template = template.replace('onload=""', 'onload="T.query(\'.content-loading-iframe\').style.display=\'none\'; this.style.display=\'block\'"');
            newEl.innerHTML = template;
            currentEl.parentNode.appendChild(newEl);
            if (T.isIOS) {
                var wrapper = T.query('.iframe-wrapper');
                wrapper.scrollTop = 1;
                wrapper.bottomReached = 0;
                wrapper.addEventListener("scroll",function(e){
                    if (!wrapper.bottomReached) {
                        if (wrapper.scrollTop == 0) {
                            wrapper.scrollTop = 1
                        }
                        if(wrapper.scrollTop > wrapper.scrollHeight - T.h()) {
                            wrapper.bottomReached = 1;
                            setTimeout(function(){
                                wrapper.bottomReached = 0;
                            },300);
                            wrapper.scrollTop = wrapper.scrollTop - 1;
                        }
                    }
                });
            }
            T.initHover(T.query('.top-menu-back-btn'), Styles.footer.bgColorHover);
        }
    },
    showMyDeals:function(){
        App.showIFrame(Messages.myDeals, Messages.myDealsSrc);
        window.location.hash = '/mydeals/';
    },
    addSearchItem:function(data){
        Deals.loadedDeals[data.id] = data;
        var newEl = document.createElement("div");
        var template = T.byId('search-item-template').innerHTML;
        var section = '';
        if (T.inArray(data.type, App.sections, 'id')) {
            section = App.sections[T.inArray(data.type, App.sections, 'id')].name;
        }
        if (T.inArray(data.type, App.cities, 'id')) {
            section = App.cities[T.inArray(data.type, App.cities, 'id')].name;
        }
        template = template.replace('%TITLE%', data.title);
        template = template.replace('%DESCRIPTION%', section+': ' +data.info);
        template = template.replace('%IMG%', '<img src="'+data.smallimage+'" onload="this.style.display=\'block\'"/>');
        newEl.onclick=function(){
            Deals.showDeal(data.id);
        };
        //template = template.replace('%IMG%', '<img src="http://letsdeal-apiimages.s3.amazonaws.com/'+data.id+'.jpg" />');
        newEl.className = 'search-item';
        newEl.innerHTML = template;
        T.initHover(newEl, Styles.searchItem.bgColorHover);
        T.query('.search-scroller').appendChild(newEl);
        if (App.searchScroller) {
            App.searchScroller.refresh();
        }
    },
    searchByCategory: function(value){
        T.query('.search-scroller').innerHTML='';
        T.query('.top-menu-search-input').value = value;
        T.query('.search-noresults').style.display = 'none';
        if (App.lastSearch != value) {
            App.lastSearch = value;
            T.request('dealsearch', function(data){
                if (data.length) {
                    for (var i in data) {
                        App.addSearchItem(data[i]);
                    }
                } else {
                    if (value != '') {
                        T.query('.search-noresults').style.display = 'block';
                        T.query('.search-noresults-keyword').innerHTML = value;
                    } else {
                        T.query('.search-noresults').style.display = 'none';
                        T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
                    }
                }
            }, {text: App.lastSearch}, function(){
            });
        }
        window.location.hash = '/search/'+value;
    },
    searchDeal: function(value){
        T.query('.search-scroller').innerHTML='';
        T.query('.top-menu-search-input').value = value;
        T.query('.search-noresults').style.display = 'none';
        if (App.lastSearch != value) {
            App.lastSearch = value;
            T.request('dealsearch', function(data){
                if (data.length) {
                    for (var i in data) {
                        App.addSearchItem(data[i]);
                    }
                } else {
                    if (value != '') {
                        T.query('.search-noresults').style.display = 'block';
                        T.query('.search-noresults-keyword').innerHTML = value;
                    } else {
                        T.query('.search-noresults').style.display = 'none';
                        T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
                    }
                }
            }, {text: App.lastSearch}, function(){
            });
        }
        window.location.hash = '/search/'+value;
    },
    showSearchPage:function(){
        if (App.addPage()) {
            var currentEl, newEl;
            currentEl = T.byId('pages-current');
            newEl = document.createElement("div");
            newEl.id = "pages-search";
            newEl.style.width = T.w()+'px';
            var template = T.byId('search-page-template').innerHTML;
            template = template.replace('%PLACEHOLDER%', Messages.searchPlaceholder);
            newEl.innerHTML = template;
            currentEl.parentNode.appendChild(newEl);
            var searchCatTpl = T.byId('search-categories-template').innerHTML;
            searchCatTpl = searchCatTpl.replace('%HEADER%', Messages.searchCategories);
            searchCatTpl = searchCatTpl.replace('%HEALTH%', Messages.catHealth);
            searchCatTpl = searchCatTpl.replace('%HOME%', Messages.catHome);
            searchCatTpl = searchCatTpl.replace('%MODE%', Messages.catMode);
            searchCatTpl = searchCatTpl.replace('%TECH%', Messages.catTech);
            searchCatTpl = searchCatTpl.replace('%SPORT%', Messages.catSport);
            searchCatTpl = searchCatTpl.replace('%FAMILY%', Messages.catFamily);
            T.byId('search-categories-template').innerHTML = searchCatTpl;
            T.query('.search-scroller').innerHTML = searchCatTpl;
            T.initHover(T.query('.search-cat'), Styles.searchItem.bgColorHover);
            if (T.isIOS) {
                if (App.searchScroller) {
                    App.searchScroller.destroy();
                }
                App.searchScroller = new IScroll(T.query('.search-wrapper'), {
                    scrollbars: true,
                    hideScrollbarsOnMove:true
                });
            }
            T.query('.top-menu-search-input').addEventListener('keyup', function() {
                App.searchDeal(this.value);
            });
            T.query('.search-noresults-title').innerHTML = Messages.noResults;
            T.query('.search-noresults-description').innerHTML = Messages.noResultsDescription;
            window.location.hash = '/search/';
        }
    },
    addChangeCityItem:function(data){
        var newEl = document.createElement("div");
        var template = T.byId('changecity-item-template').innerHTML;
        template = template.replace('%TITLE%', data.name);
        newEl.className = 'changecity-item';
        if (data.id == App.currentCityId) {
            newEl.className += ' item-active';
        }
        newEl.innerHTML = template;
        newEl.onclick = function(){
            App.currentCityId = data.id;
            for (var i in App.cities) {
                if (App.cities[i].id == data.id) {
                    var el = T.query('#hscroller-scroller-list > li:nth-child(2)'), setActive = 0;
                    el.parentNode.removeChild(el);
                    el = T.query('#top-menu-tabs > li:nth-child(2)');
                    if (el.className == 'top-menu-tabs-active') {
                        setActive = 1;
                    }
                    el.parentNode.removeChild(el);
                    Deals.addNewList(App.cities[i], 1);
                    window.localStorage.setItem('userCityId', App.cities[i].id);
                    if (setActive) {
                        T.query('#top-menu-tabs > li:nth-child(2)').className = 'top-menu-tabs-active';
                    }
                    App.mainPageHScroll.goToPage(1, 0, 0);
                }
            }
            App.goBack();
        };
        T.initHover(newEl, Styles.searchItem.bgColorHover);
        T.query('.changecity-scroller').appendChild(newEl);
        if (App.searchScroller) {
            App.searchScroller.refresh();
        }
    },
    showChangeCityPage:function(){
        if (App.addPage()) {
            var currentEl, newEl;
            currentEl = T.byId('pages-current');
            newEl = document.createElement("div");
            newEl.id = "pages-changecity";
            newEl.style.width = T.w()+'px';
            var template = T.byId('changecity-page-template').innerHTML;
            template = template.replace('%TITLE%', Messages.selectCity);
            newEl.innerHTML = template;
            currentEl.parentNode.appendChild(newEl);
            if (T.isIOS) {
                if (App.cityScroller) {
                    App.cityScroller.destroy();
                }
                App.cityScroller = new IScroll(T.query('.search-wrapper'), {
                    scrollbars: true,
                    hideScrollbarsOnMove:true
                });
            }
            for (var i in App.cities) {
                App.addChangeCityItem(App.cities[i]);
            }
            T.initHover(T.query('.top-menu-back-btn'), Styles.footer.bgColorHover);
            window.location.hash = '/city/';
        }
    },
    changeHScrollerPage: function (i) {
        i = parseInt(i);
        setTimeout(function () {
            App.mainPageHScroll.goToPage(i, 0, Styles.transitionTime, IScroll.ease.quadratic2);
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child(' + (i + 1) + ')').className = 'top-menu-tabs-active';
        }, 100)
    },
    addPage: function(){
        if (!App.inTransition && !App.mainPageHScroll.scrollActive){
            var currentEl = T.byId('pages-current');
            if (currentEl.parentNode.lastChild.id == 'pages-iframe'){
                currentEl.parentNode.removeChild(currentEl.parentNode.lastChild);
            }
            App.inTransition = 1;
            T.byId('pages-wrapper').style.display='block';
            if (App.pagesNumber>=5) {
                T.setW('pages-scroller', T.w()*(App.pagesNumber+1));
                App.pagesScroll.refresh();
            }
            App.pagesScroll.scrollBy(-T.w(),0,Styles.transitionTime);
            App.pagesNumber++;
            setTimeout(function(){
                App.inTransition = 0;
            }, Styles.transitionTime);
            return true;
        } else {
            return false;
        }
    },
    goBack: function(){
        clearInterval(App.countDownInterval);
        App.pagesScroll.scrollBy(T.w(),0,Styles.transitionTime);
        setTimeout(function(){
            var currentEl = T.byId('pages-current');
            currentEl.parentNode.removeChild(currentEl.parentNode.lastChild);
            App.pagesNumber--;
            if (App.pagesNumber == 1) {
                if (window.location.hash.length>0){
                    window.location.hash='';
                }
            }
        },Styles.transitionTime);
    },
    checkLocation: function(){
        var hash = window.location.hash;
        if (hash!='') {
            hash = hash.split('/');
            switch (hash[1]) {
                case "deal":
                    var dealId = hash[2];
                    if (dealId) {
                        if (Deals.loadedDeals[dealId]) {
                            Deals.showDeal(dealId);
                        } else {
                            T.request('getdeal', function(data){
                                Deals.loadedDeals[data.id] = data;
                                Deals.showDeal(data.id);
                            }, {
                                dealId: dealId
                            });
                        }
                    }
                break;
                case "buy":
                    var dealId = hash[2];
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
                break;
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
    },
    init: function(){
        FastClick.attach(document.body);
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / 1136;
        } else {
            T.scale = T.h() / 640;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';
        T.setH('container', T.h());
        Templates.prepareSplash();

        T.request('sections', function(data){
            App.sections = data.sections;
            App.cities = data.cities;
            for (var i in data.sections) {
                Deals.addNewList(data.sections[i]);
            }
            var userCityId = window.localStorage.getItem('userCityId');
            if (userCityId) {
                App.currentCityId = userCityId;
                for (i in App.cities) {
                    if (App.cities[i].id == userCityId) {
                        Deals.addNewList(App.cities[i], 1);
                    }
                }
            } else {
                T.xhrReq({
                    url: "http://ipinfo.io/json",
                    dataType: 'json',
                    cached:1,
                    type:'GET',
                    timeout: 3000,
                    success: function(ipData){
                        var minDistance = 99999, minDistanceCityId = 0, dist, stockholmId;
                        for (i in App.cities) {
                            if (App.cities[i].id == 'stockholm') {
                                stockholmId = i;
                            }
                            dist = T.getDistance(ipData.loc.split(','), [App.cities[i].latitude, App.cities[i].longitude]);
                            if (minDistance > dist) {
                                minDistance = dist;
                                minDistanceCityId = i;
                            }
                        }
                        if (minDistance > 2000) {
                            minDistanceCityId = stockholmId;
                        }
                        App.currentCityId = data.cities[minDistanceCityId].id;
                        window.localStorage.setItem('userCityId', data.cities[minDistanceCityId].id);
                        Deals.addNewList(App.cities[minDistanceCityId], 1);
                        App.checkLocation();
                    },
                    error: function(){
                        for (i in App.cities) {
                            if (App.cities[i].id == 'stockholm') {
                                App.currentCityId = data.cities[i].id;
                                Deals.addNewList(data.cities[i], 1);
                            }
                        }
                        App.checkLocation();
                    }
                });
            }
            Templates.preparePages();
            Templates.prepareHeader();
            Templates.prepareHScroller();
            Templates.prepareDeals();
            Templates.prepareDealInfo();
            Templates.prepareFooter();
            Templates.prepareSearch();
            if (userCityId) {
                App.checkLocation();
            }
            setTimeout(function(){
                T.byId('container').style.opacity=1;
                T.byId('splash').style.display = 'none';
            },200);
        }, null, function(){
            T.byId('splash-loading').style.display = 'none';
            T.byId('splash-message').innerHTML = Messages.connectionError
        });
        return 0;
    }
};
window.addEventListener('load', function() {
    App.init();
});
window.addEventListener("orientationchange", function() {
    setTimeout(function(){
        location.reload();
    }, 100)
}, false);
document.addEventListener('touchmove', function (e) {
    if (T.isIOS && e.changedTouches.length) {
        if (e.changedTouches[0].screenY < T.p(Styles.topMenu.height) || e.changedTouches[0].screenY > T.h() - T.p(Styles.footer.height)) {
            e.preventDefault();
        }
    }
}, false);