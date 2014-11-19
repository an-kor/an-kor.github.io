var Data = new bindable.Object();
var Fb = {
    fb: new Firebase("https://burning-heat-7084.firebaseio.com")
};
var Templates = {
    init: function(){
        var currentTpl = null, currentTplName;
        for (var i =0; i < document.scripts.length; i++){
            currentTpl = document.scripts[i];
            if(currentTpl.type == 'text/x-template') {
                currentTplName = currentTpl.id.replace('-template','');
                Templates[currentTplName] = paperclip.template(currentTpl.innerHTML);
                if (T.byId(currentTplName)) {
                    T.byId(currentTplName).appendChild((Templates[currentTplName].view(Data)).render());
                }
            }
        }
    }
};
var Models = {
    init: function(){
        Data.set('messages', {map: 'map', list: 'list', km: 'km', menu: 'menu', info: 'info', reviews: 'reviews'});
        Data.set('sidebarLinks', [{name: 'Restaurants'}, {name: 'My orders'}, {name: 'My account'}]);
    },
    loadRestaurants: function(callback){
/*        var restaurants = new bindable.Collection([{
            name: 'Qwerty 1',
            address: 'Asdfg sdfg dfgh',
            logo: 'img/logos/logo-mond.png',
            distance: 1.23,
            rating: 75
        }, {
            name: 'Xcvbnm 2',
            address: 'Rtyui ghjk jklbn',
            logo: 'img/logos/logo-ichaicha.png',
            distance: 1.23,
            rating: 100
        }, {
            name: 'Sdfgh fghjk 3',
            address: 'Hgfds nbvcv dfgh',
            logo: 'img/logos/logo-green.png',
            distance: 1.23,
            rating: 100
        }, {
            name: 'Nhtr efgb fdfg 4',
            address: 'Gewfsd rthegf dfgyjk',
            logo: 'img/logos/logo-bagel.png',
            distance: 1.23,
            rating: 33
        }]);*/
        T.job('firebase', function() {
            var ref = Fb.fb.child('restaurants');
            ref.once('value', function (snapshot) {
                var val = snapshot.val();
                var restaurants = new bindable.Collection();
                T.each(val, function(el, i){
                    el._id = i;
                    el.distance = 0;
                    el.logo = T.getLogoUrl(el)
                    if (typeof(el.lat)=='undefined' || !el.lat) {
                        el.lat = 0;
                        el.lon = 0;
                    }
                    el.rating = 100;
                    restaurants.push(new bindable.Object(el));
                });
                Data.set('restaurants', restaurants);
                Actions.map.calculateDistances();
                Actions.map.putMarkersOnMap();
                if (callback) callback();
            });
        });
        /*Data.set('restaurants', restaurants);
        callback();*/
    },
    loadMenu: function(key, callback){
        if (key == 'steam') key = 'testrestaurant';
        if (key == 'juiceverketgotgatasbacken') key = 'juiceverkethornstull';

        var menu = new bindable.Collection();

        var ref = Fb.fb.child('menuSections')
            .startAt(key)
            .endAt(key);

        T.job('menu', function() {
            ref.once('value', function (snap) {
                var sections = snap.val();
                if (sections) {
                    var catCounter = 0;
                    T.each(sections, function (section, sectionKey) {
                        var menuRef = Fb.fb.child('menuItems')
                            .startAt(sectionKey)
                            .endAt(sectionKey);
                        menuRef.once('value', function (snap) {
                            if (snap) {
                                if (snap.val()) {
                                    section.key = sectionKey;
                                    section.items = new bindable.Collection();
                                    section.index = catCounter++;
                                    var items = snap.val();
                                    var itemCounter = 0;
                                    T.each(items, function(el, i){

                                        var prices = el.prices.split(',');
                                        T.each(prices, function(el, i){
                                            prices[i] = L.Util.trim(el);
                                        });
                                        if (prices[0]=='') {
                                            prices[0] = 0
                                        }
                                        el.prices = prices;
                                        el.pricesString = [prices[0]];
                                        T.each(prices, function(price, i){
                                            if (i>0 && (price != prices[i-1])) {
                                                el.pricesString.push(price);
                                            }
                                        });
                                        el.pricesString = el.pricesString.join(' / ');
                                        el.price = el.prices[0]
                                        el.totalPrice = el.price;
                                        //el.variants.split(',');
                                        el.variants = el.variants.split(',');
                                        if(el.variants[0] == "") {
                                            el.hasVariants = false;
                                        } else {
                                            el.hasVariants = true;
                                        }
                                        el.index = itemCounter++;
                                        el.count = 1;
                                        el.logo = 'img/logos/'+(Math.ceil(Math.random()*100/10))+'.jpg'

                                        section.items.push(new bindable.Object(el));
                                    });
                                    menu.push(section);
                                }
                            }
                        });
                    });
                    Data.set('menu', menu);
                }
                if (callback) callback();
            });
        });

/*        var menu = new bindable.Collection([new bindable.Object({
            name: 'Qwerty 1',
            isOpen: true,
            items: [{
                name: 'Test 1',
                price: 123
            },{
                name: 'Test 2',
                price: 345
            },{
                name: 'Test 3',
                price: 456
            }]
        }), new bindable.Object({
            name: 'Xcvbnm 2',
            isOpen: 0,
            items: [{
                name: 'Test 1',
                price: 123
            },{
                name: 'Test 2',
                price: 345
            },{
                name: 'Test 3',
                price: 456
            }]
        }), new bindable.Object({
            name: 'Sdfgh fghjk 3',
            isOpen: 0,
            items: [{
                name: 'Test 1',
                price: 123
            },{
                name: 'Test 2',
                price: 345
            },{
                name: 'Test 3',
                price: 456
            },{
                name: 'Test 2',
                price: 345
            },{
                name: 'Test 3',
                price: 456
            }]
        }), new bindable.Object({
            name: 'Nhtr efgb fdfg 4',
            isOpen: 0,
            items: [{
                name: 'Test 1',
                price: 123
            },{
                name: 'Test 2',
                price: 345
            },{
                name: 'Test 3',
                price: 456
            }]
        })]);*/
    }
};
var Events = {};
var Actions = {
    navigation: {
        showSidebar: function(){
            document.body.className = 'st-menu-open';
            T.addEvent(["mousedown", "touchstart"], 'sidebar-bg', function(e){
                e.preventDefault();
                e.stopPropagation();
                Actions.navigation.hideSidebar();
            });
        },
        hideSidebar: function(){
            document.body.className = 'st-menu';
        },
        showRestaurantsList: function(){
            //T.show("main-list");
            T.byId('main-tabpanel-map').className = '';
            T.byId('main-tabpanel-list').className = 'active';
            T.async(function() {
                T.byId("main-map").className = 'left-side';
            });
            T.async(function() {
                T.byId("main-list").className = '';
            });
        },
        showMap: function(){
            T.byId('main-tabpanel-map').className = 'active';
            T.byId('main-tabpanel-list').className = '';
            T.async(function() {
                T.byId("main-map").className = '';
            });
            T.async(function() {
                T.byId("main-list").className = 'right-side';
            });

            /*setTimeout(function() {
                T.hide("main-list");
            },400);*/
        }
    },
    dishes: {
        show: function(catIndex, itemIndex){
            Data.set('currentItem', Data.get('menu').at(catIndex).items.at(itemIndex));
            T.byId("dish-content-info-count-input").value=1;
            document.body.style.overflowY = 'hidden';
            T.show('dish');
            T.async(function() {
                T.removeClass('dish','bottom-side');
            });
            T.showOverlay(210, 'details');
        },
        hide: function(el, id){
            T.async(function() {
                T.addClass('dish','bottom-side');
                T.async(function() {
                    T.hide('dish');
                    document.body.style.overflowY = null;
                }, 300);
            });
            T.hideOverlay('details');
        }
    },
    restaurants: {
        tmp: function(){
            /*T.addClass(el.parentNode, 'pushed-block');
             setTimeout(function(){
             T.removeClass(el.parentNode, 'pushed-block');
             },150);*/
            /*var div = document.createElement('div');
             var rect = el.getBoundingClientRect();
             div.className = 'page';
             div.style.position = 'absolute';
             div.style.background = 'white';
             div.style.top = rect.top+'px';
             div.style.right = (T.w()-rect.right)+'px';
             div.style.bottom = (T.h()-rect.bottom)+'px';
             div.style.left = rect.left+'px';
             div.style.zIndex = 2000;
             var transitionTime = 0.55;
             if (T.isAndroid){
             transitionTime = 0.15;
             }
             div.style.webkitTransition ='all '+transitionTime+'s linear';
             document.body.appendChild(div);
             T.async(function() {
             T.addClass(div,'maximize-block');
             });

             div.appendChild(T.renderTpl('dish', {}));
             T.async(function() {
             T.byId('test').style.opacity=1;
             },300);

             div.onclick=function(){
             var el = this;
             T.removeClass(el,'maximize-block');
             T.async(function(){
             T.remove(el);
             },200);
             }*/
        },
        loadInfo: function(i){

        },
        showDetails: function(_id){
            Data.get('restaurants').map(function(el, i){
                if (el._id == _id) {
                    T.job(i, function(i){
                        Data.set('currentRestaurant', Data.restaurants.at(i));
                        T.byId('details').scrollTop = 0;
                        T.async(function() {
                            T.showOverlay(110, 'main');
                            T.async(function() {
                                T.removeClass('details', 'right-side');
                                T.removeClass('cart-bottom-block', 'right-side');
                                T.removeClass('back-btn', 'left-side');
                            });

                            T.async(function() {
                            //    T.byId('main-list').style.webkitOverflowScrolling = 'auto';
                            },500);
                        });
                        if (!T.isIOS || (T.isIOS && navigator.userAgent.indexOf('OS 8')>-1)) {
                            T.addEvent('scroll', 'details', function (e) {
                                var el = e.target;
                                if (el.scrollTop > T.p(250)) {
                                    T.addClass(T.byId('details-header'), 'fixed');
                                    T.addClass(T.byId('details-tabpanel'), 'fixed');
                                    T.addClass(T.byId('details-header-info'), 'fixed');
                                } else {
                                    if ((T.byId('details-header-info').className.indexOf('fixed') > 0)) {
                                        T.removeClass(T.byId('details-header'), 'fixed');
                                        T.removeClass(T.byId('details-tabpanel'), 'fixed');
                                        T.removeClass(T.byId('details-header-info'), 'fixed');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        },
        hideDetails: function(){

            /*T.async(function() {
                T.show('main');
            });*/
            T.async(function () {
                //document.body.style.overflowY = 'auto';
                if (T.byId('details-header').className.indexOf('fixed') > 0) {
                    T.async(function () {
                        T.removeClass(T.byId('details-header'), 'fixed');
                        T.removeClass(T.byId('details-tabpanel'), 'fixed');
                        T.async(function () {
                            T.prependChild(T.byId('details'), T.byId('details-tabpanel'));
                            T.prependChild(T.byId('details'), T.byId('details-header'));
                            T.async(function () {
                                T.removeClass(T.byId('details-header-info'), 'fixed');
                            });
                        });
                    });
                }

                //T.byId('main-list').style.webkitOverflowScrolling = 'touch';
                T.async(function () {
                    T.addClass('cart-bottom-block', 'right-side');
                });
                T.async(function () {
                    T.addClass('details', 'right-side');
                    T.addClass('back-btn', 'left-side');
                });
                T.async(function() {
                    T.hideOverlay('main');
                });
            });
        },
        select: function(current, setZoom){

            if (Data.get('menu')) {
                Data.get('menu').reset([]);
            }

            var restaurants = Data.get('restaurants');
/*
            var restaurants = Data.get('restaurants').source;
            function compare(a,b) {
                var dist1 = T.getDistance([a.lat, a.lon], App.userPosition);
                var dist2 = T.getDistance([b.lat, b.lon], App.userPosition);
                if (dist1 < dist2)
                    return -1;
                if (dist1 > dist2)
                    return 1;
                return 0;
            }
            restaurants = restaurants.sort(compare);*/


            if (current < 0) {
                current = restaurants.length-1;
            }
            if (current > restaurants.length-1) {
                current = 0;
            }

            var prev = current-1, next = current+1;
            if (current == 0) {
                prev = restaurants.length-1;
            }
            if (current == restaurants.length-1) {
                next = 0;
            }

            T.setContent(T.byId("main-map-restaurant-prev"), T.renderTpl('restaurant-list-item', restaurants.at(prev)));
            T.setContent(T.byId("main-map-restaurant-current"), T.renderTpl('restaurant-list-item', restaurants.at(current)));
            T.setContent(T.byId("main-map-restaurant-next"), T.renderTpl('restaurant-list-item', restaurants.at(next)));
            if (Data.get('currentRestaurantOnMap') > -1) {
                App.map.markers[Data.get('currentRestaurantOnMap')].setIcon(App.map.plainIcon);
            }
            var el = restaurants.at(current);
            App.map.markers[current].setIcon(App.map.activeIcon);
            App.map.setView([el.lat, el.lon]);
            if (setZoom) {
            //    App.map.setZoom(15);
            }
            Data.set('currentRestaurantOnMap', current);
            Models.loadMenu(el.key);
        }
    },
    map: {

        putMarkersOnMap: function(){
            if (Data.get('restaurants')) {
                App.map.markers = [];
                Data.get('restaurants').map(function(el, i){
                    if (el.lat) {
                        var position = L.latLng(el.lat, el.lon);
                        App.map.markers[i] = L.marker(L.latLng(el.lat, el.lon), {icon: App.map.plainIcon}).addTo(App.map);
                        App.map.markers[i].on('click', function(){
                            if (i == Data.get('currentRestaurantOnMap')) {
                                Actions.restaurants.showDetails(el._id);
                            } else {
                                Actions.restaurants.select(i, true);
                            }
                        });
                    }
                });
            }
        },
        calculateDistances: function(){
            if (Data.get('restaurants')) {
                Data.get('restaurants').map(function(el){
                    el.set('distance', T.getDistance([el.lat, el.lon], App.userPosition).toFixed(2));
                });
            }
        }
    }
};
var Pages = {
    index: function(){
        if (!App.map) {
            App.map = L.map('main-map').setView(App.userPosition, 13);
            L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                attribution: '',
                maxZoom: 18,
                detectRetina: true
            }).addTo(App.map);
            var pane = T.byId('main-map-restaurants');
            L.DomEvent.addListener(pane, 'mousedown', L.DomEvent.stopPropagation);
            L.DomEvent.addListener(pane, 'touchstart', L.DomEvent.stopPropagation);
            App.map.plainIcon = new L.Icon({
                iconUrl: 'img/map-marker.png',
                iconSize: [T.p(37.5), T.p(45)],
                iconAnchor: [T.p(16.7), T.p(42)]
            });
            App.map.activeIcon = new L.Icon({
                iconUrl: 'img/map-marker-active.png',
                iconSize: [T.p(70), T.p(80)],
                iconAnchor: [T.p(35), T.p(78)]
            });


            App.mapRestaurantsScroller = new FTScroller(document.getElementById('main-map-restaurants'), {
                scrollingY: false,
                snapping: true,
                snapSizeX: T.w()-T.p(40),
                singlePageScrolls: true,
                scrollbars: false,
                bouncing: false,
                maxFlingDuration:500
            });
            T.job('location', function(){
                function onLocationFound(e) {
                    var radius = e.accuracy / 2;
                    L.marker(e.latlng, {icon: new L.Icon({
                        iconUrl: 'img/map-marker-me.png',
                        iconSize: [T.p(100), T.p(100)]
                    })}).addTo(App.map).bindPopup("You are within " + radius + " meters from this point");
                    App.userPosition = [e.latlng.lat, e.latlng.lng];
                    Actions.map.calculateDistances();
                }

                function onLocationError(e) {
                    console.log(e.message);
                }

                App.map.on('locationfound', onLocationFound);
                App.map.on('locationerror', onLocationError);

                App.map.locate({setView: true, maxZoom: 13});
            });

            Models.loadRestaurants(function(){
                Actions.restaurants.select(0);
            });
            App.mapRestaurantsScroller.scrollTo((T.w()-T.p(40))*2,false,0);

            App.mapRestaurantsScroller.addEventListener('segmentdidchange', function(e){
                var currentRestaurantOnMap = Data.get('currentRestaurantOnMap');
                if(e.segmentX != 2) {
                    if (e.segmentX == 1) {
                        currentRestaurantOnMap--;
                    } else {
                        currentRestaurantOnMap++;
                    }
                    Actions.restaurants.select(currentRestaurantOnMap);
                    App.mapRestaurantsScroller.scrollTo((T.w()-T.p(40))*2, false, 0);
                }
            });

            App.mapRestaurantsScroller.addEventListener('scrollstart', function(e){
                App.mapRestaurantsScroller.inTransition = 1;
            });

            App.mapRestaurantsScroller.addEventListener('scrollend', function(e){
                App.mapRestaurantsScroller.inTransition = 0;
            });
        }
        if (T.isIOS) {
            T.async(function(){T.byId('main-list').scrollTop = 1;},200);

        }
        T.addEvent("scroll", 'main-list', function(e){
            var el = e.target;
            if (T.isIOS) {
                if (el.scrollTop == 0) {
                    el.scrollTop = 1
                }
                if (el.scrollTop + T.position(el).height == el.scrollHeight) {
                    el.scrollTop = el.scrollTop-1
                }
            }

            if (App.lastScrollPosition != el.scrollTop) {
                App.lastScrollPosition = el.scrollTop;
                App.lastScroll = Date.now();
            }
        });

        /*T.addEvent("scroll", 'details', function(e){
            var el = e.target;
            if (T.isIOS) {
                if (el.scrollTop == 0) {
                    el.scrollTop = 1
                }
                if (el.scrollTop + T.position(el).height == el.scrollHeight) {
                    el.scrollTop = el.scrollTop-1
                }
            }

            if (App.lastScrollPosition != el.scrollTop) {
                App.lastScrollPosition = el.scrollTop;
                App.lastScroll = Date.now();
            }
        });*/
    }
};
var App = {
    userPosition: [59.335597, 18.063498],
    inTransition: false,
    lastScroll: 0,
    lastScrollPosition: -1,
    currentPage: 'index',
    test: function(){
        //var view = Templates['main-tabpanel'].view(Data);
        //console.log(view)
        //T.byId('main-tabpanel').appendChild(view.render());

        /*App.items = new bindable.Collection([1, 2, 3]);
        App.obj = new bindable.Object({items: App.items});

        var tpl = paperclip.template('{{#each:items, as: "number" }} {{number}} <br />{{/}}');

        var view = tpl.view(App.obj);

        T.byId('main-map-layer').appendChild(view.render());*/
    },
    resizeScrollers: function(){
        App.mapRestaurantsScroller.setSnapSize(T.w()-T.p(40), null);
    },
    initLiveEvents: function(){
        T.liveEvent(['mousedown','touchstart'], 'main-list-restaurant-block', function(e, el){
            if (Date.now() - App.lastScroll > 300) {
                T.addClass(el, 'pushed-block');
                if (T.isAndroid) {
                    T.async(function(){
                        T.removeClass(el, 'pushed-block');
                    },500);
                }
            }
        });
        T.liveEvent(['mouseup','touchend'], 'main-list-restaurant-block', function(e){
            T.each(T.query('.main-list-restaurant-block.pushed-block'), function(el){
                T.removeClass(el, 'pushed-block');
            });
        });
        T.liveEvent('click', 'main-list-restaurant-block', function(e, el){
            if (Date.now() - App.lastScroll > 300) {
                var _id = el.getAttribute('data-id');
                Actions.restaurants.showDetails(_id);
                Data.get('restaurants').map(function(el, i){
                    if (el._id == _id) {
                        T.job(i, function (i) {
                            Actions.restaurants.select(i);
                        });
                    }
                });
            }
        });
        T.liveEvent(['mouseup','touchend'], 'main-map-restaurant-block-content', function(e, el){
            if (!App.mapRestaurantsScroller.inTransition) {
                Actions.restaurants.showDetails(el.getAttribute('data-id'));
            }
        });

    },
    init: function(){
        FastClick.attach(document.body); // prevent 300ms pause on click
        T.checkStandalone();
        T.calculateScale();
        T.resizeStyles(2);
        Models.init();
        App.initLiveEvents();
        Pages.index();

/*      var link = document.getElementById('main-map-restaurants');
        L.DomEvent.addListener(link, 'mousedown', L.DomEvent.stopPropagation);
        L.DomEvent.addListener(link, 'mouseup', L.DomEvent.stopPropagation);

        L.DomEvent.addListener(link, 'touchstart', L.DomEvent.stopPropagation);
        L.DomEvent.addListener(link, 'touchend', L.DomEvent.stopPropagation);

        var refresh = function(i){
            document.getElementById("main-map-restaurant-current").innerHTML = i;
            document.getElementById("main-map-restaurant-next").innerHTML = i+1;
            document.getElementById("main-map-restaurant-prev").innerHTML = i-1;
        };
        var scroller = new FTScroller(document.getElementById('main-map-restaurants'), {
            scrollingY: false,
            snapping: true,
            snapSizeX: T.w()-40,
            singlePageScrolls: true,
            scrollbars: false,
            bouncing: false
        });
        scroller.scrollTo((T.w()-40)*2,false,0);
        var i = 1;
        refresh(i);
        scroller.addEventListener('segmentdidchange', function(e){
            if(e.segmentX != 2) {
                if (e.segmentX == 1) {
                    i--;
                    refresh(i);
                } else {
                    i++;
                    refresh(i);
                }
                scroller.scrollTo((T.w()-40)*2, false, 0);
            }
        })*/

    }
};
window.addEventListener('load', function() {
    Templates.init();
    Architect.setupWorkersPath('js/vendor/workers');
    App.init();
    window.scrollTo( 0, 0 );
}, false);

window.addEventListener('unload', function() {
    Architect.endJob('firebase');
}, false);

window.addEventListener('resize', function() {
    T.calculateScale();
    T.resizeStyles(2);
    App.resizeScrollers();
}, false);

window.addEventListener("orientationchange", function() {
    T.calculateScale();
    T.resizeStyles(2);
    App.resizeScrollers();
}, false);