var App = {
    // Current number of sections in the horizontal scrolling container
    pagesNumber: 1,
    // Flag to check if deals loading in progress
    isDealsLoading: 0,
    // Flag to check if animation is active now
    inTransition: 0,
    // Flag to check if location's hash has changed
    hashChanged: 0,
    // How many deals to load each time
    numberOfDealsPerLoad: (T.isIPad?6:10),

    // Changes active section of the horizontal scrolling container
    changeHScrollerPage: function (i) {
        i = parseInt(i);
        setTimeout(function () {
            App.mainPageHScroll.goToPage(i, 0, Styles.transitionTime, IScroll.ease.quadratic2);
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child(' + (i + 1) + ')').className = 'top-menu-tabs-active';
        }, 100)
    },

    // Adds a new section to the horizontal scrolling container
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

    // init application
    init: function(){
        FastClick.attach(document.body); // prevent 300ms pause on click
        T.checkStandalone();

        // calculate scale rate using user device's height and width
        var windowH = 1136, windowW = 800;
        var screenH = screen.availHeight;
        if (Math.abs(window.orientation) == 90) {
            screenH = screen.availWidth;
        }
        if (T.isAndroid) {
            screenH = screenH/window.devicePixelRatio;
        }

        if (!T.isDesktop && (screenH - window.innerHeight > 20)) {
            windowH = windowH - (screenH - window.innerHeight)*2.5;
        }
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / windowH;
        } else {
            T.scale = T.h() / windowW;
        }
        if (T.scale > 0.8) {
            T.scale = 0.8;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';
        T.setH('container', T.h());

        // prepare splashscreen
        Templates.prepareSplash();
        // prepare "no connection" page
        Templates.prepareNoConnection();

        // load sections of the horizontal scrolling container
        T.request('sections', function(data){
            App.sections = data.sections;
            App.cities = data.cities;
            App.startCities = data.startCities;
            App.searchCategories = data.searchCategories;

            // get current userCity based on user's location (restore if it was cached previously or get by IP or GPS)
            var userCityId = false;
            try{
                userCityId = window.localStorage.getItem('userCityId');
            } catch (e){}
            if (userCityId || location.hash.length>3) {
                if (!userCityId) {
                    userCityId = 'default';
                }
                for (i in App.cities) {
                    if (location.hash.indexOf(App.cities[i].id) > -1) {
                        userCityId = App.cities[i].id;
                    }
                }
                App.currentCityId = userCityId;
                if (userCityId != 'default') {
                    for (i in App.cities) {
                        if (App.cities[i].id == userCityId) {
                            Deals.addNewList(App.startCities[i]);
                            setTimeout(function(i){
                                return function(){
                                    Deals.addNewList(App.cities[i], 2);
                                }
                            }(i),0);
                        }
                    }
                } else {
                    Deals.addNewList(App.startCities[App.startCities.length-1]);
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
                            var minDistance = 99999, minDistanceCityId = 0, dist;
                            for (i in App.cities) {
                                dist = T.getDistance(ipData.loc.split(','), [App.cities[i].latitude, App.cities[i].longitude]);
                                if (minDistance > dist) {
                                    minDistance = dist;
                                    minDistanceCityId = i;
                                }
                            }
                            if (minDistance > 150) {
                                minDistanceCityId = App.startCities.length-1;
                                App.currentCityId = 'default';
                            } else {
                                App.currentCityId = data.cities[minDistanceCityId].id;
                            }
                            try{
                                window.localStorage.setItem('userCityId', App.currentCityId);
                            } catch (e){}
                            if (App.currentCityId != 'default') {
                                Deals.addNewList(App.cities[minDistanceCityId], 1);
                            }
                            Deals.addNewList(App.startCities[minDistanceCityId], 0);
                            App.checkLocation();
                        },
                        error: function(){
                            console.log('checkByIp error');
                            Deals.addNewList(App.startCities[App.startCities.length-1], 0);
                            App.checkLocation();
                        }
                    });
                };

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(pos){
                        console.log('getCurrentPosition success');
                        var minDistance = 99999, minDistanceCityId = 0, dist;
                        var crd = pos.coords;
                        for (i in App.cities) {
                            dist = T.getDistance([crd.latitude, crd.longitude], [App.cities[i].latitude, App.cities[i].longitude]);
                            if (minDistance > dist) {
                                minDistance = dist;
                                minDistanceCityId = i;
                            }
                        }
                        if (minDistance > 150) {
                            minDistanceCityId = App.startCities.length-1;
                            App.currentCityId = 'default';
                        } else {
                            App.currentCityId = data.cities[minDistanceCityId].id;
                        }
                        try{
                            window.localStorage.setItem('userCityId', App.currentCityId);
                        } catch (e){}
                        if (minDistanceCityId != 'default') {
                            Deals.addNewList(App.cities[minDistanceCityId], 1);
                        }
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

            // prepare styles for all templates
            Templates.preparePages();
            Templates.prepareHeader();
            Templates.prepareHScroller();
            Templates.prepareDeals();
            Templates.prepareDealInfo();
            Templates.prepareFooter();
            Templates.prepareSearch();
            Templates.prepareModalPages();

            // for each section load a list of deals
            for (var i in data.sections) {
                Deals.addNewList(data.sections[i], null, (T.is2Columns)?App.numberOfDealsPerLoad:App.numberOfDealsPerLoad/2);
            }

            if (userCityId) {
                App.checkLocation();
            }
            // hide splash screen and show introduction instructions
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
                App.showIntro();
            },1000);

            window.addEventListener("hashchange", App.hashChangeEvent, false);
            setInterval(App.checkConnection, App.checkConnectionInterval)
            setInterval(Deals.checkDealsTimer, 1000);
            App.initialized = true;

        }, null, function(){
            App.showNoConnection();
        });
        return 0;
    },
    changeOrientation: function(){
        window.scrollTo( 0, 0 );
        T.byId('container').style.display = 'none';
        T.byId('splash').style.display = 'block';
        setTimeout(function(){
            location.reload();
        }, 1500)
    }
};
var Templates = {};

window.addEventListener('load', function() {

    // preload all static images (icons and logos)
    setTimeout(T.preloadImages, 0);

    // begin app's initialization
    if ( T.isIOS ) {
        // if this is IOS 7 we need to wait some time before initialization, cause of a bug in Safari
        var v = T.getIOSVersion();
        if (v[0] >= 7 && v[1] >= 1) {
            var windowH = 1136, windowW = 800;
            var screenH = screen.availHeight;
            if (Math.abs(window.orientation) == 90) {
                screenH = screen.availWidth;
            }
            if (!window.orientation || window.orientation == 180) {
                T.scale = T.h() / windowH;
            } else {
                T.scale = T.h() / windowW;
            }
            document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';
            Templates.prepareSplash();
            setTimeout(App.init, 2000);
        } else {
            App.init();
        }
    } else {
        App.init();
    }

    // scroll to top
    window.scrollTo( 0, 0 );

    // Sailthru setup
    if (window.Sailthru) {
        Sailthru.setup({domain: 'horizon.letsdeal.se'});
    }
});

// hook for device orientation change
window.addEventListener("orientationchange", function() {
    App.changeOrientation()
}, false);

// prevent touchmove event inside top and bottom bars (for IOS)
document.addEventListener('touchmove', function (e) {
    if (T.isIOS && e.changedTouches.length) {
        if (e.changedTouches[0].screenY < T.p(Styles.topMenu.height) || e.changedTouches[0].screenY > T.h() - T.p(Styles.footer.height)) {
            e.preventDefault();
        }
    }
}, false);