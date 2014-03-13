var App = {
    pagesNumber: 1,
    isDealsLoading: 0,
    inTransition: 0,
    hashChanged: 0,
    showIFrame:function(title, src){
        if (T.isIOS) {
            src.replace("device=","device=app");
            src += "&is_touch=1";
            location.href=src;
            return false;
        }
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
            /*if (T.isIOS) {
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
            }*/
            T.initHover(T.query('.top-menu-back-btn'), Styles.footer.bgColorHover);
        }
    },
    lastCheckConnectionTs: new Date().getTime(),
    checkConnectionInterval: 5000,
    checkConnection: function(){
        if (new Date().getTime() - App.lastCheckConnectionTs > 180*App.checkConnectionInterval) {
            var id = App.mainPageHScroll.currentPageIndex.substr(8);
            var divs = T.query('#deallist_'+id+' > div', false);
            var length = divs.length;
            for (var i=0; i<length; i++){
                divs[i].parentNode.removeChild(divs[i]);
            }
            T.byId('hscroller-scroller-loading').style.display='block';
            Deals.loadDeals(id, 0, Styles.hScroller.numberOfImages*length, function(result){
                if (result) {
                    T.byId('deallist_'+id).appendChild(result);
                    T.byId('hscroller-scroller-loading').style.display='none';
                }
            });
        }
        App.lastCheckConnectionTs = new Date().getTime();
        /*var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', T.url +"?" +  new Date().getTime());
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    if (App.isOffline) {
                        App.hideNoConnection();
                    }
                } else {
                    App.showNoConnection();
                }
                // clearTimeout(xmlhttp.timeout);
            }
        };
        xmlhttp.send(null);
        */
        //xmlhttp.timeout = setTimeout(function () { xmlhttp.abort(); App.showNoConnection(); }, 15000);
    },
    hideNoConnection: function(){
        App.isOffline = false;
        T.byId('page-on-top').innerHTML = '';
        T.byId('page-on-top').style.display = 'none';
    },
    showNoConnection: function(){
        App.isOffline = true;
        var template = T.byId('noconnection-template').innerHTML;
        template = template.replace('%TITLE%', Messages.noConnectionTitle);
        template = template.replace('%MSG%', Messages.noConnectionMsg);
        T.byId('page-on-top').innerHTML = template;
        T.byId('page-on-top').style.display = 'block';
    },
    showMyDeals:function(){
        App.showIFrame(Messages.myDeals, Messages.myDealsSrc);
        App.changeHash('/mydeals/');
    },
    showInstructions: function(){
        if (!window.localStorage.getItem("instructionsShown")){
            var template = T.byId('instructions-template').innerHTML;
            template = template.replace('%TITLE%', Messages.instructionsTitle);
            template = template.replace('%MSG_H%', Messages.instructionsHorizontal);
            template = template.replace('%MSG_V%', Messages.instructionsVertical);
            T.byId('page-on-top').innerHTML = template;
            T.byId('page-on-top').style.display = 'block';
        }
    },
    hideInstructions: function(){
        try{
            window.localStorage.setItem("instructionsShown", 1);
        } catch(e) {}
        T.byId('page-on-top').innerHTML = '';
        T.byId('page-on-top').style.display = 'none';
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
    searchByCategory: function(value, title){
        T.query('.search-scroller').innerHTML='';
        App.searchInputSetValue(title);
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
        App.changeHash('/search/'+value);
    },
    searchInputSetValue: function(value){
        T.query('.top-menu-search-input', 1).value = value;
        if (value!=''){
            T.query('#top-menu-search-input-empty').style.display = 'block';
        } else {
            T.query('#top-menu-search-input-empty').style.display = 'none';
        }
    },
    searchDeal: function(value){
        T.query('.search-scroller').innerHTML='';
        if (value.indexOf('section:')==-1){
            App.searchInputSetValue(value);
        }
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
        } else {
            T.query('.search-noresults').style.display = 'none';
            T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
        }
        App.changeHash('/search/'+value);
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
            searchCatTpl = searchCatTpl.replace(new RegExp('%HEALTH%', 'g'), Messages.catHealth);
            searchCatTpl = searchCatTpl.replace(new RegExp('%HOME%', 'g'), Messages.catHome);
            searchCatTpl = searchCatTpl.replace(new RegExp('%MODE%', 'g'), Messages.catMode);
            searchCatTpl = searchCatTpl.replace(new RegExp('%TECH%', 'g'), Messages.catTech);
            searchCatTpl = searchCatTpl.replace(new RegExp('%SPORT%', 'g'), Messages.catSport);
            searchCatTpl = searchCatTpl.replace(new RegExp('%FAMILY%', 'g'), Messages.catFamily);
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
            T.query('.top-menu-search-input').addEventListener('input', function() {
                if (this.value!=''){
                    T.query('#top-menu-search-input-empty').style.display = 'block';
                } else {
                    T.query('#top-menu-search-input-empty').style.display = 'none';
                }
                App.searchDeal(this.value);
            });
            T.query('#top-menu-search-input-empty').addEventListener('click', function() {
                 App.searchInputSetValue('');
                 App.searchDeal('');
                 T.query('.top-menu-search-input').focus();
            });
            T.query('#top-menu-search-input-empty').addEventListener('touchstart', function() {
                this.style.opacity = 0.5;
            });

            T.query('#top-menu-search-input-empty').addEventListener('touchend', function() {
                this.style.opacity = 1;
            });

            T.query('.search-noresults-title').innerHTML = Messages.noResults;
            T.query('.search-noresults-description').innerHTML = Messages.noResultsDescription;
            App.changeHash('/search/');
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
                    var el = T.query('#hscroller-scroller-list > li:nth-child(1)'), setActive = 0;
                    el.parentNode.removeChild(el);
                    el = T.query('#top-menu-tabs > li:nth-child(1)');
                    if (el.className == 'top-menu-tabs-active') {
                        setActive = 1;
                    }
                    el.parentNode.removeChild(el);

                    var el = T.query('#hscroller-scroller-list > li:nth-child(1)'), setActive = 0;
                    el.parentNode.removeChild(el);
                    el = T.query('#top-menu-tabs > li:nth-child(1)');
                    if (el.className == 'top-menu-tabs-active') {
                        setActive = 1;
                    }
                    el.parentNode.removeChild(el);

                    Deals.addNewList(App.cities[i], 0);
                    Deals.addNewList(App.startCities[i], 0);
                    Styles.hScroller.numberOfPages--;
                    Styles.hScroller.numberOfPages--;
                    T.updateStyle('#hscroller-scroller', {
                        width: T.w()*Styles.hScroller.numberOfPages+'px'
                    });
                    window.localStorage.setItem('userCityId', App.cities[i].id);
                    if (setActive) {
                        T.query('#top-menu-tabs > li:nth-child(2)').className = 'top-menu-tabs-active';
                    }
                    App.mainPageHScroll.goToPage(0, 0, 0);
                    App.mainPageHScroll.refresh();
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
            App.changeHash('/city/');
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
    goBack: function(ignoreSearch){
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
    },
    changeHash: function(value){
        App.hashChanged = 1;
        window.location.hash = value;
        setTimeout(function(){
            App.hashChanged = 0;
        }, 200);
    },
    hashChangeEvent: function(e){
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
    },
    checkLocation: function(){
        var hash = window.location.hash, dealId;
        if (hash!='') {
            hash = hash.split('/');
            switch (hash[1]) {
                case "buy":
                case "deal":
                    dealId = hash[2];
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
    },
    init: function(){
        FastClick.attach(document.body);
        T.checkStandalone();
        var windowH = 1136, windowW = 800, screenH = 1136;
        //alert(screen.availHeight + " " + window.innerHeight)
        if (T.isAndroid) {
            screenH = screen.availHeight/window.devicePixelRatio;
        } else {
            screenH = screen.availHeight;
        }
        if (!T.isDesktop && (screenH - window.innerHeight > 20)) {
            windowH = windowH - (screenH - window.innerHeight)*2.5;
        }
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / windowH;
        } else {
            T.scale = T.h() / windowW;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';
        T.setH('container', T.h());
        Templates.prepareSplash();
        window.localStorage.removeItem('userCityId');
        T.request('sections', function(data){
            App.sections = data.sections;
            App.cities = data.cities;
            App.startCities = data.startCities;
            var userCityId = window.localStorage.getItem('userCityId');
            if (userCityId || location.hash.length>3) {
                if (!userCityId) {
                    userCityId = 'stockholm';
                }
                App.currentCityId = userCityId;
                for (i in App.cities) {
                    if (App.cities[i].id == userCityId) {
                        Deals.addNewList(App.startCities[i]);
                        Deals.addNewList(App.cities[i]);
                    }
                }
            } else {
                var checkByIp = function(e){
                    T.xhrReq({
                        url: "http://ipinfo.io/json",
                        dataType: 'json',
                        cached:1,
                        type:'GET',
                        timeout: 3000,
                        success: function(ipData){
                            console.log('checkByIp success');
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
                            Deals.addNewList(App.cities[minDistanceCityId], 0);
                            Deals.addNewList(App.startCities[minDistanceCityId], 0);
                            App.checkLocation();
                        },
                        error: function(){
                            console.log('checkByIp error');
                            for (i in App.cities) {
                                if (App.cities[i].id == 'stockholm') {
                                    App.currentCityId = App.cities[i].id;
                                    Deals.addNewList(App.cities[i], 0);
                                    Deals.addNewList(App.startCities[i], 0);
                                }
                            }
                            App.checkLocation();
                        }
                    });
                };

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(pos){
                        console.log('getCurrentPosition success');
                        var minDistance = 99999, minDistanceCityId = 0, dist, stockholmId;
                        var crd = pos.coords;
                        for (i in App.cities) {
                            if (App.cities[i].id == 'stockholm') {
                                stockholmId = i;
                            }
                            dist = T.getDistance([crd.latitude, crd.longitude], [App.cities[i].latitude, App.cities[i].longitude]);
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
                        Deals.addNewList(App.cities[minDistanceCityId], 0);
                        Deals.addNewList(App.startCities[minDistanceCityId], 0);
                        App.checkLocation();
                    }, function(e){
                        console.log('getCurrentPosition error');
                        checkByIp(e);
                    }, {
                      enableHighAccuracy: true,
                      timeout: 3000,
                      maximumAge: 0
                    });
                } else {
                    checkByIp();
                }
            }

            for (var i in data.sections) {
                Deals.addNewList(data.sections[i]);
            }

            Templates.preparePages();
            Templates.prepareHeader();
            Templates.prepareHScroller();
            Templates.prepareDeals();
            Templates.prepareDealInfo();
            Templates.prepareFooter();
            Templates.prepareSearch();
            Templates.prepareModalPages();
            if (userCityId) {
                App.checkLocation();
            }
            setTimeout(function(){
                T.byId('container').style.opacity=1;
                if (T.isStandalone) {
                    document.body.style.backgroundColor = '#40a3b9';
                }
                T.byId('splash').style.display = 'none';
                if (navigator.splashscreen) {
                    setTimeout(function(){
                        navigator.splashscreen.hide();
                    },500);
                }
                App.showInstructions();
            },1000);
            window.addEventListener("hashchange", App.hashChangeEvent, false);
            setInterval(App.checkConnection, App.checkConnectionInterval)

        }, null, function(){
            T.byId('splash-loading').style.display = 'none';
            T.byId('splash-message').innerHTML = Messages.connectionError
        });
        return 0;
    }
};
window.addEventListener('load', function() {
    setTimeout(T.preloadImages, 0);
    App.init();
    window.scrollTo( 0, 1 );
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