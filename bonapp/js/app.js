FastClick.attach(document.body);
var Templates = {};
var Events = {};
var Data = {
    fb: new Firebase("https://burning-heat-7084.firebaseio.com")
};

var $$ = Dom7;
var App = new Framework7({
    modalTitle: 'Bonamango',
    fastClicks: true,
    //swipePanel: 'left',
    animateNavBackIcon: true,
    init: false,
    swipeBackPage: false
});
var mainView = App.addView('.view-main', {
    dynamicNavbar: true
});

Templates.restaurantListItem = Handlebars.compile($('#restaurantListItem-template').html());
Templates.restaurantMenu = Handlebars.compile($('#menu-template').html());
Templates.restaurantCart = Handlebars.compile($('#cart-template').html());

var Markers = [];
var Map = false;

App.onPageInit('contact', function (page) {
    var mySlider = App.slider('.slider-container', {
        pagination:'.slider-pagination',
        spaceBetween: 50,
        speed: 600
    });
});

App.onPageInit('index', function (page) {
    //$$('#map').height(window.innerHeight);
    if (Map) {
       Map.remove();
    }
    Map = L.map('map').setView([59.335597, 18.063498], 12);

    L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
        attribution: '',
        maxZoom: 18,
        detectRetina: true
    }).addTo(Map);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng, {icon: L.AwesomeMarkers.icon({icon: 'user', prefix: 'fa', markerColor: 'blue'}) }).addTo(Map)
            .bindPopup("You are within " + radius + " meters from this point");

    }

    function onLocationError(e) {
        console.log(e.message);
    }

    Map.on('locationfound', onLocationFound);
    Map.on('locationerror', onLocationError);

    Map.locate({setView: true, maxZoom: 12});

    App.changePage = function(key){
        localStorage.setItem('key', key);
        mainView.loadPage('contact.html');
    };

    var order = JSON.parse(localStorage.getItem('order'));
    if (order && !App.orderTracker) {
        var ref = new Firebase(order.path);
        ref.once('value', function (order) {
            order = order.val();
            if (order.status == 'waiting') {
                $$('#status-badge').show();
                $$('#status-badge span').html('new');
            } else {
                $$('#status-badge').show();
                $$('#status-badge span').html(order.status);
            }
        });

        App.orderTracker = ref.on('child_changed', function (order) {
            var message = '';
            ref.once('value', function (order) {
                order = order.val();
                if (order.status == 'confirmed') {
                    message = 'Your order has been confirmed by the restaurant. Preparation time is ' + order.preparationTime + ' minutes.';
                    App.confirm(message + ' Do you agree with that or want to cancel the order?',
                        function () {
                            $$('#order-message').html(message);
                            $$('#reject').hide();
                        },
                        function () {
                            App.cancelOrder();
                        }
                    );
                } else {
                    if (order.status == 'waiting') {
                        message = 'Your order has been set as Pending by the restaurant';
                    } else {
                        message = 'Your order has been '+order.status;
                    }
                    App.addNotification({
                        title: 'Order status changed',
                        message: message,
                        hold: 5000
                    });
                    $$('#order-message').html(message);
                    $$('#reject').show();
                }
                if (order.status == 'waiting') {
                    $$('#status-badge').show();
                    $$('#status-badge span').html('new');
                } else {
                    $$('#status-badge').show();
                    $$('#status-badge span').html(order.status);
                }
            });
        });
    }

    function restaurants(){
        var ref = Data.fb.child('restaurants');
        var colors = ['orange', 'green', 'purple', 'darkpurple', 'darkgreen'];
        var prepareEl = function(el){

            if (!el.lat) {
                el.lat = 0;
                el.lon = 0;
            }
            el.logoId = '-empty';
            if (el.key == 'ichaicha') {
                el.logoId = '-ichaicha';
            }
            if (el.key == 'steam') {
                el.logoId = '-steam';
            }
            if (el.name == 'Juiceverket') {
                el.logoId = '-juiceverket';
            }
            if (el.name == 'Steam') {
                el.logoId = '-steam';
            }
            if (el.key == 'martinsgrona') {
                el.logoId = '-martinsgrona';
            }
            return el;
        };
        var setMarker = function (k, el) {
            if (!Markers[k] || !$('#restaraunt-list-item-'+ el.key).length) {
                Markers[k] = L.marker([el.lat, el.lon], {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: colors[Math.floor(Math.random()*5)]}) }).addTo(Map).on('click', function(){App.changePage(el.key)});
            } else {
                Markers[k].setLatLng([el.lat, el.lon]).on('click', function(){App.changePage(el.key)})
            }
        };
        ref.on('value', function (snapshot) {
            var val = snapshot.val();
            $.each(val, function(k, el){
                el = prepareEl(el);
                if (!$('#restaraunt-list-item-'+ el.key).length) {
                    setMarker(k, el);
                    $('#restaurants-list').append(Templates.restaurantListItem(el));
                }
            });
        });

        if (!Events['restaurants']) {

            ref.on('child_added', function (snapshot) {
                var el = prepareEl(snapshot.val());
                if (!$('#restaraunt-list-item-'+ el.key).length) {
                    setMarker(snapshot.name(), el);
                    $('#restaurants-list').append(Templates.restaurantListItem(el));
                }
            });

            ref.on('child_changed', function (snapshot) {
                var el = prepareEl(snapshot.val());
                setMarker(snapshot.name(), el);
                $('#restaraunt-list-item-'+ el.key).replaceWith(Templates.restaurantListItem(el));
            });

            ref.on('child_removed', function (snapshot) {
                var el = prepareEl(snapshot.val());
                Markers[snapshot.name()].remove();
                $('#restaraunt-list-item-'+ el.key).remove();
            });
            Events['restaurants'] = true;
        }
    }
    restaurants();

});

App.updateCart = function(){
    var currentItems = JSON.parse(localStorage.getItem('cart'));
    var price = 0, number = 0;
    var curKey = localStorage.getItem('key');
    if (!currentItems){
        currentItems = [];
    }
    $.map(currentItems, function(el){
        if (curKey == el.restaurant) {
            number++;
            if (!isNaN(el.price)) {
                price+=el.price;
            }
        }
    });
    $('.cartNumber').html(number);
    $('.cartPrice').html(price);
};

App.addItemToCart = function(){
    var currentVariant =localStorage.getItem('currentVariant');
    var item = {
        name: $('.curName').html() + (currentVariant==""?"":' ('+currentVariant+')'),
        price: parseInt($('.curPrice').html()),
        restaurant: localStorage.getItem('key'),
        id: Math.round(Math.random()*10000)
    };
    var currentItems = JSON.parse(localStorage.getItem('cart'));
    if(!currentItems) {
        currentItems = [];
    }
    currentItems.push(item);
    localStorage.setItem('cart', JSON.stringify(currentItems));
    App.updateCart();
};
App.removeItemFromCart = function(id){
    var currentItems = JSON.parse(localStorage.getItem('cart'));
    if (!currentItems){
        currentItems = [];
    }

    $.map(currentItems, function(el, i){
        if (currentItems[i].id == id) {
            currentItems.splice(i, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(currentItems));
    App.updateCart();
};

App.checkCart = function(){
    var currentItems = JSON.parse(localStorage.getItem('cart'));
    var price = 0, number = 0;
    var curKey = localStorage.getItem('key');
    if (!currentItems){
        currentItems = [];
    }
    $.map(currentItems, function(el){
        if (curKey == el.restaurant) {
            number++;
            if (!isNaN(el.price)) {
                price+=el.price;
            }
        }
    });
    if (number == 0) {
        App.alert('Your order is empty');
        return false;
    } else {
        return true;
    }
};


App.onPageBeforeInit('contact', function (page) {
    var key = localStorage.getItem('key');
    $('#restaurant-id').attr('data-id', key);
    var ref = Data.fb.child('restaurants')
        .startAt(key)
        .endAt(key);

    ref.on('child_added', function (snapshot) {
        var el = snapshot.val();
        $('#restaurant-title').html(el.name);
        localStorage.setItem('restaurant-title', el.name);
        $('#restaurant-address').html(el.address);
        $('#restaurant-description').html(el.description);
    });

    ref.on('child_changed', function (snapshot) {
        var el = snapshot.val();
        if ($('#restaurant-id').attr('data-id') == el.key) {
            $('#restaurant-title').html(el.name);
            $('#restaurant-address').html(el.address);
            $('#restaurant-description').html(el.description);
        }
    });
    var getMenu = function(key){
        var ref = Data.fb.child('menuSections')
            .startAt(key)
            .endAt(key);
        var prepareVariants = function(item){
            var variants = item.variants.split(',');
            var variantButtons = '';
            $.map(variants, function(el, i){
                el = $.trim(el);
                if (el!='') {
                    var active = '';
                    if (i == 0) {
                        active = 'active';
                    }
                    variantButtons += '<a href="#" class="button '+active+'" onclick="$(this).parent().find(\'.active\').removeClass(\'active\'); $(this).addClass(\'active\'); $(\'.curPrice\').html(\''+item.prices[i]+'\'); localStorage.setItem(\'currentVariant\', \''+el+'\')">'+el+'</a>'
                }
            });
            if (variantButtons.length>0) {
                variantButtons = '<div class="popup-header2">Variants</div>'+
                '<p class="buttons-row">'+
                variantButtons+
                '</p>';
            }
            item.variantButtons = variantButtons;
            return item;
        };

        var preparePrices = function(el){
            var prices = el.prices.split(',');
            $.map(prices, function(el, i){
                prices[i] = $.trim(el);
            });
            if (prices[0]=='') {
                prices[0] = 0
            }
            el.prices = prices;
            el.pricesString = prices.join(' / ');
            return el;
        };
        ref.once('value', function (snap) {
            var sections = snap.val();
            if (sections) {
                $.each(sections, function (sectionKey, section) {
                    var menuRef = Data.fb.child('menuItems')
                        .startAt(sectionKey)
                        .endAt(sectionKey);
                    menuRef.once('value', function (snap) {
                        if (snap) {
                            if (snap.val()) {
                                section.key = sectionKey;
                                section.items = snap.val();
                                $.each(snap.val(), function(k, el){
                                    section.items[k] = preparePrices(el);
                                    section.items[k].logoId = Math.ceil(Math.random()*10);
                                });
                                $('#menu-list').append(Templates.restaurantMenu(section));
                                $.each(snap.val(), function(k, el){
                                    el = preparePrices(el);
                                    el = prepareVariants(el);
                                    $$('#menu-item-'+k).on('click', function () {
                                        var popupHTML = function(){
                                            localStorage.setItem('currentVariant', $.trim(el.variants.split(',')[0]));
                                            return '<div class="popup">'+

                                            '<div class="content-block">'+
                                            '<div class="popup-image"><img src="http://www.delivery-club.ru/pcs/777/3882746_s.jpg"></div>'+
                                            '<div class="popup-header1 curName">'+ el.name +'</div>'+
                                            '<div class="popup-text">'+ el.ingredients +'</div>'+
                                            el.variantButtons+
                                            '<div class="buttons-block row">'+
                                            '<div class="col-50">'+
                                            '<a href="#" class="close-popup button button-big color-black">Cancel</a>'+
                                            '</div>'+
                                            '<div class="col-50">'+
                                            '<a href="#" class="close-popup button button-big button-fill color-green" onclick="App.addItemToCart()"><span class="curPrice">'+ el.prices[0] +'</span> KR</a>'+
                                            '</div>'+
                                            '</div>'+
                                            '</div>'+
                                            '</div>'+

                                            '</div>';
                                        };
                                        App.popup(popupHTML());
                                    });
                                });
                                if ($('#menu-list > li').length == Object.keys(sections).length){
                                    $('#menu-list-preloader').hide();
                                    $('#menu-list').show();
                                }
                            } else {
                                $('#menu-list-preloader').hide();
                                $('#menu-list').show();
                            }
                        }
                    });

                    menuRef.on('child_changed', function (snap) {
                        var el =snap.val();
                        var k =snap.name();
                        el = preparePrices(el);
                        el = prepareVariants(el);

                        $$('#menu-item-price-'+k).html(el.pricesString);
                        $$('#menu-item-name-'+k).html(el.name);
                        $$('#menu-item-name-'+k).html(el.name);

                        $$('#menu-item-'+k).off('click');
                        $$('#menu-item-'+k).on('click', function () {
                            var popupHTML = function(){
                                localStorage.setItem('currentVariant', '');
                                return '<div class="popup">'+

                                '<div class="content-block">'+
                                '<div class="popup-image"><img src="http://www.delivery-club.ru/pcs/777/3882746_s.jpg"></div>'+
                                '<div class="popup-header1">'+ el.name +'</div>'+
                                '<div class="popup-text">'+ el.ingredients +'</div>'+
                                 el.variantButtons+
                                '<div class="buttons-block row">'+
                                '<div class="col-50">'+
                                '<a href="#" class="close-popup button button-big color-black">Cancel</a>'+
                                '</div>'+
                                '<div class="col-50">'+
                                '<a href="#" class="close-popup button button-big button-fill color-green"><span class="curPrice">'+ el.prices[0] +'</span> KR</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+

                                '</div>';
                            };
                            App.popup(popupHTML());
                        });
                    });

                    menuRef.on('child_removed', function (snap) {
                        $('#menu-item-' + snap.name()).remove();
                    });
                });
            } else {
                $('#menu-list-preloader').hide();
                $('#menu-list').append('<li><br/><center>Menu is empty</center></li>');
                $('#menu-list').show();
            }
        });

        ref.on('child_changed', function (snap) {
            $('#menu-section-name-' + snap.name()).html(snap.val().name);
        });

        ref.on('child_removed', function (snap) {
            $('#menu-section-group-' + snap.name()).remove();
        });
    };
    getMenu(key);
    App.updateCart();
});

App.onPageBeforeInit('order', function (page) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var items = [];
    var result = {
        restaurantTitle: localStorage.getItem('restaurant-title')
    };
    if (cart) {
        $.map(cart, function(el, i){
            if (el.restaurant == localStorage.getItem('key')){
                items.push(el);
            }
        });
    }
    result.items = items;
    $('#cart-container').html(Templates.restaurantCart(result));
    App.updateCart();
});

App.onPageBeforeInit('checkout', function (page) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var items = [];
    var result = {
        restaurantTitle: localStorage.getItem('restaurant-title')
    };
    if (cart) {
        $.map(cart, function(el, i){
            if (el.restaurant == localStorage.getItem('key')){
                items.push(el);
            }
        });
    }
    result.items = items;
    $('#checkout-cart').html(Templates.restaurantCart(result));
    if (localStorage.getItem('phone')) {
        $('#phone').val(localStorage.getItem('phone'));
    }
    $('#phone').on('blur', function(){
        localStorage.setItem('phone', $('#phone').val());
    });

    App.updateCart();
});
var showModals = false;

App.validateCheckout = function(){
    if (!App.checkCart()) return false;
    if ($('#phone').val() == "") {
        App.alert('You need to enter phone number', function(){
            $('#phone').focus()
        });
        return false;
    }
    var restaurantKey = localStorage.getItem('key');
    var order = {
        id: Math.ceil(Math.random()*1000),
        customerPhone: $('#phone').val(),
        customerName: $('#customerName').val(),
        delivery: $("#delivery-select").val(),
        payment: $("#payment-select").val(),
        cart: JSON.parse(localStorage.getItem('cart')),
        restaurant: restaurantKey,
        created_at: new Date().toUTCString(),
        status: 'waiting',
        restaurantTitle: localStorage.getItem('restaurant-title'),
        total: $('.cartPrice').html()
    };

    var newRecord = Data.fb.child('orders').push();
    newRecord.setWithPriority(order, restaurantKey, function(){
        localStorage.removeItem('cart');
        order.path = newRecord.toString();
        localStorage.setItem('order', JSON.stringify(order));
        mainView.loadPage('thankyou.html')
    });

    //mainView.loadPage('thankyou.html')
};

App.onPageBeforeInit('thankyou', function (page) {

    var order = JSON.parse(localStorage.getItem('order'));
    $('.orderId').html(order.id);
    var ref = new Firebase(order.path);
    ref.once('value', function (order) {
        order = order.val();
        if (order.status == 'confirmed') {
            message = 'Your order has been confirmed by the restaurant. Preparation time is ' + order.preparationTime + ' minutes.';
            $$('#reject').hide();
        } else {
            if (order.status == 'waiting') {
                var message = 'Your order has been sent to the restaurant. Waiting for the confirmation.';
            } else {
                var message = 'Your order has been '+order.status+' by the restaurant';
            }
        }
        $('#confirmed-order-container').html(Templates.restaurantCart({
            restaurantTitle: order.restaurantTitle,
            items: order.cart,
            withoutRemove: true,
            message: message
        }));
        $$('#order-message').html(message);
        if (order.status == 'waiting') {
            $$('#status-badge').show();
            $$('#status-badge span').html('new');
        } else {
            $$('#status-badge').show();
            $$('#status-badge span').html(order.status);
        }

    });
    if (!App.orderTracker) {
        App.orderTracker = ref.on('child_changed', function (order) {
            var message = '';
            ref.once('value', function (order) {
                order = order.val();

                if (order.status == 'confirmed') {
                    message = 'Your order has been confirmed by the restaurant. Preparation time is ' + order.preparationTime + ' minutes.';
                    App.confirm(message + ' Do you agree with that or want to cancel the order?',
                        function () {
                            $$('#order-message').html(message);
                            $$('#reject').hide();
                        },
                        function () {
                            App.cancelOrder();
                        }
                    );
                } else {
                    if (order.status == 'waiting') {
                        message = 'Your order has been set as Pending by the restaurant';
                    } else {
                        message = 'Your order has been '+order.status;
                    }
                    App.addNotification({
                        title: 'Order status changed',
                        message: message,
                        hold: 5000
                    });
                    $$('#order-message').html(message);
                    $$('#reject').show();
                }
                if (order.status == 'waiting') {
                    $$('#status-badge').show();
                    $$('#status-badge span').html('new');
                } else {
                    $$('#status-badge').show();
                    $$('#status-badge span').html(order.status);
                }
            });
        });
    }
});
App.cancelOrder = function(){
    var order = JSON.parse(localStorage.getItem('order'));
    var ref = new Firebase(order.path);
    ref.update({
        status: 'cancelled'
    }, function(){
        localStorage.removeItem('order');
    });
    $$('#status-badge').hide();
    mainView.loadPage('index.html');
};
App.init();