var Data = {};
var Fb = {
    fb: new Firebase("https://burning-heat-7084.firebaseio.com")
};
var Views = {
    restaurnatsListRating: function(rating){
        return m('div[class="restaurant-list-item-starrating"]', [
            m('div[class="restaurant-list-item-starrating-filled"]', {style: {width: rating + '%'}})
        ])
    },
    restaurantsListItem: function(i){
        var base = "restaurant-list-item-";
        return m('table[cellpadding="0"][cellspacing="0"]', [
            m('tr', [
                m('td[rowspan="3"][class="'+base+'logo"]', {style: {backgroundImage: 'url('+
                T.getLogoUrl(i)
                +')'}}),
                m('td[class="'+base+'name"]', [
                    m("div",i.name)
                ]),
                m('td[class="'+base+'location"]', [
                    (i.distance?i.distance:0) + " " +Data.messages.km
                ])
            ]),
            m('tr', [
                m('td[colspan="2"][class="'+base+'address"]', [m('div',[
                    i.address
                ])])
            ]),
            m('tr', [
                m('td', [
                    Views.restaurnatsListRating(i.rating)
                ])
            ])
        ])
    },
    restaurantsList : function(){
        return m('div', [
            Data.restaurantsSorted.map(function(i) {
                return m('div[class="main-list-restaurant-block"]', {'data-id': i._id}, [
                    Views.restaurantsListItem(i)
                ])
            })
        ])
    },
    restaurantMenu: function(){
        if (Data.menu) {
            return Data.menu.map(function(category) {
                return m('div', {id: 'menu-category'+category.key},  [
                    m('div[class="menu-category"]', {'data-id': category.key, onclick: function(e){
                        T.toggleClass('menu-category'+e.target.getAttribute('data-id'), 'open');
                    }}, category.name),
                    m('div[class="menu-items-container"]',category.items.map(function(i){
                        i = Data.meals[i];
                        var isInTheCart = Models.cart.isInTheCart(i._id);
                        return m('table[cellpadding="0"][cellspacing="0"][class="menu-item"]', {'data-id': i._id, onclick: function(_id){return function(e){
                            location.href = location.href+'/meal/'+_id;
                        }}(i._id)}, [
                            m('tr', [
                                m('td[rowspan="2"][class="menu-item-img"]', [
                                    m('div', {style: {backgroundImage: 'url('+
                                    i.img
                                    +')'}})
                                ]),
                                m('td', [
                                    m('div[class="menu-item-name"]',i.name)
                                ]),
                                m('td[rowspan="2"][class="menu-item-btn"]', {style: {backgroundImage: 'url('+
                                (!isInTheCart?'img/plus-icon.png':'img/checked-icon.png')
                                +')'}})
                            ]),
                            m('tr', [
                                m('td[colspan="2"]', [m('div[class="menu-item-price"]',[
                                    i.pricesString + " " + Data.messages.kr
                                ])])
                            ])
                        ])
                    }))
                ])
            })
        }
    },
    details : function(){
        return [
            m('div[id="details-wrapper"]', [
                 m('div[id="details-header"]', [
                     m('div[class="header-bg"]', {style: {backgroundImage: 'url('+
                     'img/logos/restaurant-big.jpg'
                     +')'}}),
                     m('div[id="details-header-info"]', [
                         m('div[id="details-header-title"]', Data.currentRestaurant.name),
                         m('div[id="details-header-address"]', Data.currentRestaurant.address),
                         m('div[id="details-header-rating"]', [
                             Views.restaurnatsListRating(Data.currentRestaurant.rating)
                         ])
                     ]),
                     m('div[class="border-bottom"]')
                ]),
                m('div[id="details-tabpanel"][class="tabpanel"]', [
                    m('div[id="details-tabpanel-menu"]', {className: 'active'}, Data.messages.menu),
                    m('div[id="details-tabpanel-info"]', {className: ''}, Data.messages.info),
                    m('div[id="details-tabpanel-reviews"]', {className: ''}, Data.messages.reviews)
                ]),
                m('div[id="details-content"]', [
                    m('div[id="details-menu"]', [
                        Views.restaurantMenu()
                    ]),
                    m('div[id="details-info"]', {className: "right-side"}, [
                    ]),
                    m('div[id="details-reviews"]',  {className: "right-side"}, [
                    ])
                ])
            ])
        ];
    },
    checkoutPage: function(){

        var currentCart = Data.cart[Data.currentRestaurant._id];
        var total = 0, productsCount = currentCart?currentCart.length: 0, active = false;
        T.each(currentCart, function(el){
            total += el.totalPrice
        });
        if (total){
            if (Data.checkout.deliveryMethod == 'delivery') total += 10;
            if (Data.checkout.phone && Data.checkout.name) {
                active = true;
            }
        }

        return m('div[id="checkout-page-wrapper"]', [

            m('div[id="checkout-page-header"][class="header"]', [
                m('div', Data.messages.checkout),
                m('div[class="border-bottom"]')
            ]),
            m('div[id="checkout-page-content"]', [

                m('div[class="sub-header"]', [Data.messages.personalInfo]),
                m('div[class="inputs-section"]', [
                    m('input[type="tel"][placeholder="'+Data.messages.phone+' *"]', {value: Data.checkout.phone, onchange:function(){
                        Data.checkout.phone = this.value;
                        localStorage.setItem('phone', Data.checkout.phone);
                    }}),
                    m('input[type="text"][placeholder="'+Data.messages.name+' *"]', {value: Data.checkout.name, onchange:function(){
                        Data.checkout.name = this.value;
                        localStorage.setItem('name', Data.checkout.name);
                    }})
                ]),

                m('div[class="sub-header"]', [Data.messages.deliveryMethod]),
                m('div[class="inputs-section inputs-section-inline delivery-method"]', {onclick:function(e){
                    T.removeClass(T.query('.delivery-method div.checked'), 'checked');
                    T.addClass(e.target, 'checked');
                    if (e.target.id == "delivery-pickup") {
                        Data.checkout.deliveryMethod = 'pickup';
                    }
                    if (e.target.id == "delivery-seating") {
                        Data.checkout.deliveryMethod = 'seating';
                    }
                    if (e.target.id == "delivery-delivery") {
                        Data.checkout.deliveryMethod = 'delivery';
                    }
                }},[
                    [
                        m('div[id="delivery-pickup"]',{className: "input-radio-inline "+  (Data.checkout.deliveryMethod == 'pickup'?"checked":"")}, Data.messages.pickup),
                        m('div[id="delivery-seating"]',{className: "input-radio-inline "+  (Data.checkout.deliveryMethod == 'seating'?"checked":"")}, Data.messages.seating),
                        m('div[id="delivery-delivery"]',{className: "input-radio-inline "+  (Data.checkout.deliveryMethod == 'delivery'?"checked":"")}, Data.messages.delivery),
                        m('div[style="clear:both"]')
                    ]
                ]),

                Data.checkout.deliveryMethod == 'delivery'?[
                    m('div[class="sub-header"]', [Data.messages.deliveryAddress]),
                    m('div[class="inputs-section"]', [
                        m('input[type="text"][placeholder="'+Data.messages.address+'"]'),
                        m('input[type="text"][placeholder="'+Data.messages.comment+'"]')
                    ])
                ]:null,

                m('div[class="sub-header"]', [Data.messages.paymentMethod]),
                m('div[class="inputs-section payment-method"]', {onclick:function(e){

                    if (e.target.className.indexOf("input-radio")>-1) {
                        T.removeClass(T.query('.payment-method div.checked'), 'checked');
                        T.addClass(e.target, 'checked');
                        if (e.target.id == "method-credit-card") {
                            Data.checkout.paymentMethod = 'card';
                        } else {
                            Data.checkout.paymentMethod = 'cash';
                        }
                    }
                }},[
                    [
                        m('div',{className: "input-radio "+  (Data.checkout.paymentMethod == 'cash'?"checked":"")}, Data.messages.cash),
                        m('div[id="method-credit-card"]',{className: "input-radio " +  (Data.checkout.paymentMethod == 'card'?"checked":"")}, Data.messages.creditCard),

                        Data.checkout.paymentMethod == 'card'?[
                                m('input[type="number"][placeholder="Card number"]'),
                                m('input[type="text"][placeholder="Card owner"]'),
                                m('input[type="month"][placeholder="MM/YY"]'),
                                m('input[type="number"][placeholder="CVV"]')
                        ]:null
                    ]
                ]),

                Views.cartContent()
            ]),
            m('div[id="checkout-bottom-block"]', [
                m('div[id="checkout-bottom-checkout-btn"][class="bottom-panel-btn"]',[
                    m('div', {className: active?'active':'', onclick: function(){
                        if (this.className.indexOf('active')>-1) {
                            Models.checkout(total);
                        }
                    }}, [
                        Data.messages.checkoutBtn, total?[' (', total, ' ', Data.messages.kr, ')']:null
                    ])
                ])
            ])
        ])
    },
    cartPage: function(){
        return m('div[id="cart-page-wrapper"]', [
            m('div[id="cart-page-header"][class="header"]', [
                m('div', Data.messages.cart),
                m('div[class="border-bottom"]')
            ]),
            m('div[id="cart-page-content"]', Views.cartContent())
        ])
    },
    cartContent: function(cart){
        if (Data.cart && Data.cart[Data.currentRestaurant._id] || cart) {
            var restaurantTitle = Data.currentRestaurant.name, isCart = true;
            if (!cart) {
                cart = Data.cart[Data.currentRestaurant._id];
            } else {
                isCart = false;
                restaurantTitle = Data.order.restaurantTitle;
            }
            return [
                m('div[class="sub-header"]', [m('span', Data.messages.restaurant), ' ', restaurantTitle]),
                m('div[class="cart-items"]',
                    !cart.length?m('p', Data.messages.cartIsEmpty):T.map(cart, function(item, i){
                        return m('table[cellpadding="0"][cellspacing="0"][class="menu-item"]', [
                            m('tr', [
                                m('td', isCart?{onclick: function(i){return function(e){
                                    Data.currentCartMeal = i;
                                    Data.savedStateMeal = T.clone(Data.cart[Data.currentRestaurant._id][i]);
                                    location.href = location.href+'/meal/'+i;
                                }}(i)}:{}, [
                                    m('div[class="menu-item-name"]',[
                                        item.name,
                                        (typeof(item.variants[item.selectedVariant])!='undefined')?' ('+item.variants[item.selectedVariant]+')':''
                                    ])
                                ]),
                                m('td[rowspan="2"][class="cart-item-btns"]',[
                                    m('input[type="number"][class="count-input"]]',{disabled: !isCart, style: !isCart?'float:right':'',value:item.count, min:"1", max:"10", onchange:function(i){return function(e){
                                        var val = parseInt(e.target.value);
                                        if (!val) val = 1;
                                        if (val > 10) val = 10;
                                        Data.cart[Data.currentRestaurant._id][i].count = val;
                                        Data.cart[Data.currentRestaurant._id][i].totalPrice = val * Data.cart[Data.currentRestaurant._id][i].price;

                                        window.localStorage.setItem('bonapp-cart', JSON.stringify(Data.cart));
                                    }}(i)}),
                                    isCart?m('div[class="remove-item-btn"]', {
                                        onclick:function(i){return function(){
                                            Data.modal.text = 'Are you sure want to remove this item?';
                                            Data.modal.rightButton.callback = function(){
                                                Models.cart.remove(i);
                                                Actions.modal.hide();
                                            };
                                            Actions.modal.show();
                                        }}(i),
                                        style: {backgroundImage: 'url('+
                                    'img/remove-icon.png'
                                    +')'}}):null
                                ])
                            ]),
                            m('tr', [
                                m('td[colspan="2"]', [m('div[class="menu-item-price"]',[
                                    item.totalPrice + " " + Data.messages.kr
                                ])])
                            ])
                        ])
                    })
                )
            ]
        }
    },
    sidebar : function(){
        return m('div', [
            m('ul', [
                Data.sidebarLinks.map(function (i) {
                    return m('li', [
                        m('a[href="'+ i.href+'"]', {onclick: function(){Actions.navigation.hideSidebar()}}, i.name)
                    ])
                })
            ])
        ])
    },
    tabbar: function(){
        return Data.mainTabbarLinks.map(function(tab){
            return m('div', {id: tab.id, onclick: function(){location.href=tab.href}, className: tab.active?'active':''}, [Data.messages[tab.message]]);
        })
    },
    modal: function(){
        return [
            m('div[class="modal-inner"]', [
                m('div[class="modal-title"]', Data.modal.title),
                m('div[class="modal-text"]', Data.modal.text)
            ]),
            m('div[class="modal-buttons"]', [
                m('span[class="modal-button"]', {onclick:Data.modal.leftButton.callback}, Data.modal.leftButton.text),
                m('span[class="modal-button modal-button-bold"]', {onclick:Data.modal.rightButton.callback}, Data.modal.rightButton.text)
            ])
        ]
    },
    cartBottomBlock: function(){
        if (Data.cart) {
            var currentCart = Data.cart[Data.currentRestaurant._id];
            var total = 0, productsCount = currentCart?currentCart.length:0;
            T.each(currentCart, function(el){
                total += el.totalPrice
            });
            return [
                m('div[id="cart-bottom-icon"]', {onclick: function(){
                    if (productsCount ){
                        location.href = '#/restaurant/'+Data.currentRestaurant._id+'/cart';
                    }
                }}),
                m('div[id="cart-bottom-info"]', {onclick: function(){
                    if (productsCount){
                        location.href = '#/restaurant/'+Data.currentRestaurant._id+'/cart';
                    }
                }}, [
                    m('div[id="cart-bottom-total"]', [
                        total, " ", m('span', Data.messages.kr)
                    ]),
                    m('div[id="cart-bottom-items"]', [
                        productsCount, ' ',(!productsCount||productsCount>1)?Data.messages.items:Data.messages.item
                    ])
                ]),
                m('div[id="cart-bottom-checkout-btn"][class="bottom-panel-btn"]',[
                    m('div', {className: productsCount?'active':'', onclick: function(){
                        location.href = '#/restaurant/'+Data.currentRestaurant._id+'/checkout'
                    }}, [
                        [Data.messages.checkoutBtn]
                    ])
                ])
            ]
        }
    },
    meal: function(){
        var currentMeal = Data.meals[Data.currentMeal], isCartItem = false, isCartPage = (location.href.indexOf('cart')>-1 || location.href.indexOf('checkout')>-1);
        if (isCartPage) {
            if (Data.cart[Data.currentRestaurant._id]) {
                currentMeal = Data.cart[Data.currentRestaurant._id][Data.currentCartMeal];
                isCartItem = true;
            }
        }
        if (currentMeal) {
            currentMeal.totalPrice = currentMeal.count * currentMeal.prices[currentMeal.selectedVariant];
            return [
                m('div[id="meal-wrapper"][class="page scroll"]', [
                    m('div[id="meal-header"]', [
                        m('div[class="header-bg"]', {style: {backgroundImage: 'url('+
                        'img/logos/2674_chili-sin-carne_vegetarmat-org.jpg'
                        +')'}}),
                        m('div[class="border-bottom"]')
                    ]),
                    m('div[id="meal-content"]', [
                        m('div[id="meal-content-header"]'),
                        m('div[id="meal-content-description"]',[
                            m('h3',[
                                currentMeal.name
                            ]),
                            m('p',[
                                currentMeal.ingredients
                            ])
                        ]),
                        m('div[id="meal-content-info"]',[
                            m('div[id="meal-content-info-price"][class="menu-item-price"]',[
                                currentMeal.pricesString, " ", Data.messages.kr
                            ]),
                            m('div[id="meal-content-info-count"]',[
                                m('div[id="meal-content-info-count-minus"]',{onclick:function(e){
                                    var val = currentMeal.count;
                                    if (isCartPage) {
                                        Data.cart[Data.currentRestaurant._id][Data.currentCartMeal].count = val>1 ? val-1 : val
                                    } else {
                                        Data.meals[Data.currentMeal].count = val>1 ? val-1 : val
                                    }
                                }},[
                                    "-"
                                ]),
                                m('div',[
                                    m('input[id="meal-content-info-count-input"][type="number"][class="count-input"]]',{value:currentMeal.count, min:"1", max:"10", onchange:function(e){
                                        var val = parseInt(e.target.value);
                                        if (!val) val = 1;
                                        if (val > 10) val = 10;
                                        if (isCartPage) {
                                            Data.cart[Data.currentRestaurant._id][Data.currentCartMeal].count = val
                                        } else {
                                            Data.meals[Data.currentMeal].count = val
                                        }
                                    }})
                                ]),
                                m('div[id="meal-content-info-count-plus"]',{onclick:function(e){
                                    var val = currentMeal.count;
                                    if (isCartPage) {
                                        Data.cart[Data.currentRestaurant._id][Data.currentCartMeal].count = val<10 ? val+1 : val
                                    } else {
                                        Data.meals[Data.currentMeal].count = val<10 ? val+1 : val
                                    }
                                }},[
                                    "+"
                                ])
                            ]),
                            m('div[id="meal-content-info-time"][class="menu-item-price"]',[
                                20, " ", Data.messages.minutes
                            ])
                        ])
                    ]),
                    Views.mealVariants(currentMeal, isCartItem),
                    m('div[style="clear: both"]')
                ]),
                m('div[id="meal-bottom-panel"]',[
                    m('div[id="meal-bottom-panel-submit-btn"][class="bottom-panel-btn"]', !isCartItem?{onclick: function(){
                        Models.cart.add();
                        history.back();
                    }}:{onclick: function(){
                        history.back();
                    }},
                        m('div[class="active"]', [currentMeal.totalPrice, ' ', Data.messages.kr])
                    ),
                    m('div[id="meal-bottom-panel-cancel-btn"][class="bottom-panel-btn"]',[
                        m('div[class="plain"]', !isCartItem?{onclick:function(){
                            history.back();
                        }}:{onclick:function(){
                            Data.cart[Data.currentRestaurant._id][Data.currentCartMeal] = Data.savedStateMeal;
                            history.back();
                        }},Data.messages.cancel)
                    ])
                ])
            ]
        }
    },
    mealVariants: function(currentMeal, isCartItem){
        if (!currentMeal.selectedVariant) {
            currentMeal.selectedVariant = 0;
        }
        if (currentMeal.variants.length){
            return m('div[id="meal-additives"]',[
                m('h4[class="subheader"]',[
                    m('span',[
                        Data.messages.variantsHeader
                    ])
                ]),
                m('div[class="meal-additives-list radio"]',{onclick:function(e){
                    T.removeClass(T.query('.meal-additives-list.radio div.checked'), 'checked');
                    var el = T.parentHasClass(e.target, 'meal-additives-list-item');
                    T.addClass(el, 'checked');
                    if(isCartItem) {
                        Data.cart[Data.currentRestaurant._id][Data.currentCartMeal].selectedVariant = el.getAttribute('data-index');
                    } else {
                        Data.meals[Data.currentMeal].selectedVariant = el.getAttribute('data-index');
                    }
                }},[
                    T.map(currentMeal.variants, function(el, i){
                        return m('div', {'data-index': i, className: (i==currentMeal.selectedVariant?'meal-additives-list-item checked':'meal-additives-list-item')}, [
                            el,
                            m('span', [currentMeal.prices[i], ' ', Data.messages.kr])
                        ])
                    })
                ])
            ])
        }
    },
    ordersPage: function(){
        return m('div[id="orders-page-wrapper"]', [
            m('div[id="orders-page-header"][class="header"]', [
                m('div[class="toggle-sidebar-btn"]',{ onclick:Actions.navigation.showSidebar}),
                m('div', Data.messages.currentOrder),
                m('div[class="border-bottom"]')
            ]),
            Data.order?m('div[id="orders-page-content"]', [

                m('div[class="sub-header"]', [Data.messages.currentOrder]),
                m('div[class="inputs-section"]', [
                    m('span', [Data.order.statusMsg])
                ]),
                Views.cartContent(Data.order.newCart)
            ]):m('div[id="orders-page-content"]', [
                m('div[class="sub-header"]', 'No orders')
            ])
        ])
    }
};
var Models = {
    init: function(){
        Data.messages =  {
            map: 'map',
            list: 'list',
            km: 'km',
            menu: 'menu',
            info: 'info',
            reviews: 'reviews',
            kr: "kr",
            checkout: "Order checkout",
            checkoutBtn: "Checkout",
            minutes: "min",
            variantsHeader: "Variants",
            cancel: 'Cancel',
            item:'item',
            items: 'items',
            cart: 'Order cart',
            restaurant: 'Restaurant',
            save:'Save',
            no: 'No',
            yes: 'Yes',
            cartIsEmpty: 'Cart is empty',
            personalInfo: 'Personal info',
            deliveryMethod: 'Delivery',
            name: 'Name',
            phone: 'Phone',
            delivery: 'Delivery (10kr)',
            pickup: 'Pick up',
            seating: 'Seating',
            paymentMethod: 'Payment method',
            cash: 'Cash',
            creditCard: 'Visa/MasterCard',
            deliveryAddress: 'Delivery address',
            address: 'Address',
            comment: 'Delivery instructions',
            preorderDateTime: 'Preorder date and time',
            preorderDate: 'Preorder date',
            preorderTime: 'Preorder time',
            orderItems: 'Order items',
            currentOrder: 'Current order',
            status: 'Status',
            waitingStatus: 'Your order has been sent to the restaurant. Waiting for the confirmation.'
        };

        Data.modal = {
            title: 'Bonapp.se',
            text: '',
            leftButton: {
                text:Data.messages.no,
                callback: Actions.modal.hide
            },
            rightButton: {
                text:Data.messages.yes,
                callback: Actions.modal.hide
            }
        };
        Data.sidebarLinks = [{name: 'Restaurants', href: '#/list'}, {name: 'My orders', href: '#/orders'}, {name: 'My account', href: '#/orders'}];
        Data.cart = JSON.parse(window.localStorage.getItem("bonapp-cart"));
        if (!Data.cart) {
            Data.cart = {};
        }
        Data.mainTabbarLinks = [{
            id: "main-tabpanel-map",
            active: 1,
            //action: Actions.navigation.showMap,
            href: '#/map',
            message: 'map'
        },{
            id: "main-tabpanel-list",
            href: '#/list',
            // action: Actions.navigation.showRestaurantsList,
            message: 'list'
        }];
        Data.restaurants = {};
        Data.meals = {};
        Data.restaurantsSorted = [];
        Data.currentRestaurant = {};
        Data.currentMeal = null;
        Data.currentCartMeal = 0;
        Data.savedStateMeal = {};
        Data.checkout = {
            paymentMethod: 'cash',
            deliveryMethod: 'pickup',
            name: localStorage.getItem('name'),
            phone: localStorage.getItem('phone')
        };
        Data.order = JSON.parse(localStorage.getItem('order'));
        Data.order.statusMsg = Data.messages.waitingStatus;
        this.initObservers();
    },
    restaurants: {
        compareDistances: function(position){
            return function(a,b) {
                var dist1 = T.getDistance([a.lat, a.lon], position);
                var dist2 = T.getDistance([b.lat, b.lon], position);

                if (dist1 == 0)
                    return 1;
                if (dist1 < dist2)
                    return -1;
                if (dist1 > dist2)
                    return 1;
                return 0;
            }
        },
        sortByDistance: function(data){
            return T.map(data, function(el, i){
                el._id = i;
                el.distance = T.getDistance([el.lat, el.lon], App.userPosition).toFixed(2);
                return el;
            }).sort(Models.restaurants.compareDistances(App.userPosition));
        },
        alignMapMarkers: function(){
            if (App.map) {
                Data.restaurantsSorted.map(function(el, i){
                    if (el.lat) {
                        var position = L.latLng(el.lat, el.lon);
                        if (App.map.markers[el._id]) {
                            if (!App.map.markers[el._id].getLatLng().equals(position)) {
                                App.map.markers[el._id].setLatLng(position)
                            }
                        } else {
                            App.map.markers[el._id] = L.marker(position, {icon: App.map.plainIcon}).addTo(App.map);
                            App.map.markers[el._id].on('click', function(e){
                                if (Data.currentRestaurant._id == el._id || (!Data.currentRestaurant._id && e.target.className.indexOf('active')>-1)){
                                    location.href = '#/restaurant/'+Data.currentRestaurant._id;
                                } else {
                                    Actions.restaurants.select(el._id);
                                }
                            });
                        }
                    }
                });
            }
        }
    },
    initObservers: function(){
        ObserveUtils.defineObservableProperties(Data, "restaurants", "currentRestaurant");
        Object.observe(Data, function (changes) {
            changes.map(function(obj){
                if (obj.name == "restaurants") {
                    Data.restaurantsSorted = Models.restaurants.sortByDistance(Data.restaurants);
                    Models.restaurants.alignMapMarkers();
                    m.redraw();
                    if (!Object.keys(obj.oldValue).length) {
                        for (var i= 0,l=Data.restaurantsSorted.length;i<l;i++){
                            if (Data.restaurantsSorted[i].distance != 0) {
                                Actions.restaurants.select(Data.restaurantsSorted[i]._id);
                                break;
                            }
                        }
                    }
                }
                if (obj.name == "currentRestaurant") {
                    if (Data.currentRestaurant._id != obj.oldValue._id) {
                        Data.menu = [];
                        m.redraw();
                        Models.loadMenu(Data.currentRestaurant._id);
                    }
                }
            })
        });
        Models.initOrderTracker();
    },
    initOrderTracker:function(){
        if (!Data.order) return false;
        var order = Data.order;
        var ref = new Firebase(order.path);
        App.orderTracker = ref.on('child_changed', function (order) {
            var message = '';
            ref.once('value', function (order) {
                order = order.val();
                if (order.status == 'confirmed') {
                    Data.order.statusMsg = 'Your order has been confirmed by the restaurant.'+((order.preorder_time)?'':' Preparation time is ' + order.preparationTime + ' minutes.');
                } else {
                    if (order.status == 'waiting') {
                        Data.order.statusMsg = 'Your order has been sent to the restaurant. Waiting for the confirmation.';
                    } else {
                        Data.order.statusMsg = 'Your order has been '+order.status+' by the restaurant';
                    }

                    if (window.Notification && Notification.permission === "granted") {
                        if (navigator.vibrate) {
                            navigator.vibrate([300,200,300]);
                        }
                        var n = new Notification('Order status changed', {body: message});
                    }
                }
                m.redraw();
            });
        });
    },
    initRestaurants: function(){
        var ref = Fb.fb.child('restaurants');
        ref.once('value', function (s) {
            Data.restaurants = s.val();
            Data.restaurantsLoaded = true;
        });

        ref.on('child_added', function (s) {
            if (Data.restaurantsLoaded) {
                Data.restaurants[s.name()] = s.val();
                Data.restaurants = T.clone(Data.restaurants);
            }
        });

        ref.on('child_changed', function (s) {
            Data.restaurants[s.name()] = s.val();
            Data.restaurants = T.clone(Data.restaurants);
        });

        ref.on('child_removed', function (s) {
            delete Data.restaurants[s.name()];
            Data.restaurants = T.clone(Data.restaurants);
        });
    },
    loadMenu: function(_id){
        var restaurant = Data.restaurants[_id], key = restaurant.key;
        if (key == 'steam') key = 'testrestaurant';
        if (key == 'juiceverketgotgatasbacken') key = 'juiceverkethornstull';

        var menu = [];

        var ref = Fb.fb.child('menuSections')
            .startAt(key)
            .endAt(key);

        ref.once('value', function (snap) {
            var sections = snap.val();
            if (sections) {
                var catCounter = 0;
                T.each(sections, function (section, sectionKey) {
                    var menuRef = Fb.fb.child('menuItems')
                        .startAt(sectionKey)
                        .endAt(sectionKey);
                    menuRef.once('value', function (snap) {
                        if (snap && snap.val()) {
                            section.key = sectionKey;
                            section.items = [];
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
                                el._id = i;
                                el.prices = prices;
                                el.pricesString = [prices[0]];
                                T.each(prices, function(price, i){
                                    if (i>0 && (price != prices[i-1])) {
                                        el.pricesString.push(price);
                                    }
                                });
                                el.pricesString = el.pricesString.join(' / ');
                                el.price = el.prices[0];
                                el.totalPrice = el.price;
                                //el.variants.split(',');
                                el.variants = el.variants.split(',');
                                el.variants = el.variants.map(function(i){return i.toString().trim()});
                                if(el.variants[0] == "") {
                                    el.variants = [];
                                }
                                el.selectedVariant = 0;
                                el.index = itemCounter++;
                                el.count = 1;
                                el.img = 'img/logos/'+(Math.ceil(Math.random()*100/10))+'.jpg';
                                Data.meals[i] = el;
                                section.items.push(i);
                            });
                            menu.push(section);
                            m.redraw();
                        }
                    });
                });
                Data.menu = menu;
            }
        });
    },
    loadMeal: function(id){
        Data.currentMeal = id;
        m.redraw();
    },
    cart: {
        add: function(){
            var el = Data.meals[Data.currentMeal];
            el._id = Data.currentMeal;
            if (!Data.cart[Data.currentRestaurant._id]){
                Data.cart[Data.currentRestaurant._id] = [];
            }
            Data.cart[Data.currentRestaurant._id].push(el);
            window.localStorage.setItem("bonapp-cart", JSON.stringify(Data.cart));
        },
        isInTheCart: function(_id){
            if (Data.cart) {
                if (Data.cart[Data.currentRestaurant._id]) {
                    for (var i = 0; i < Data.cart[Data.currentRestaurant._id].length; i++) {
                        if (Data.cart[Data.currentRestaurant._id][i]._id == _id) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        remove: function(i){
            T.removeFromArray(Data.cart[Data.currentRestaurant._id], i);
            window.localStorage.setItem("bonapp-cart", JSON.stringify(Data.cart));
        }
    },
    checkout: function(total){
        var cart = [], el;
        if (Data.cart[Data.currentRestaurant._id]) {
            for (var i = 0; i < Data.cart[Data.currentRestaurant._id].length; i++) {
                el = Data.cart[Data.currentRestaurant._id][i];
                console.log(el)
                cart.push({
                    "name": el.name + ((typeof(el.variants[el.selectedVariant])!='undefined')?' ('+el.variants[el.selectedVariant]+')':''),
                    "price": el.totalPrice,
                    "restaurant": Data.currentRestaurant.key,
                    "id": el._id
                })
            }
        }
        Data.order = {
            id: Math.ceil(Math.random()*10000),
            customerPhone: Data.checkout.phone,
            customerName: Data.checkout.name,
            discount: 0,
            delivery: Data.checkout.deliveryMethod,
            payment: Data.checkout.paymentMethod,
            newCart: Data.cart[Data.currentRestaurant._id],
            cart: cart,
            restaurant: Data.currentRestaurant.key,
            created_at: new Date().toUTCString(),
            status: 'waiting',
            restaurantTitle: Data.currentRestaurant.name,
            total: total
        };
        var newRecord = Fb.fb.child('orders').push();
        newRecord.setWithPriority(Data.order, Data.currentRestaurant.key, function(){
            localStorage.removeItem('bonapp-cart');
            Data.order.path = newRecord.toString();
            localStorage.setItem('order', JSON.stringify(Data.order));
            location.href = '#/orders';
        });
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
        },
        showOrders: function(){
            T.async(function() {
                T.showOverlay(110, 'main');
                T.async(function () {
                    T.removeClass('orders-page', 'right-side');
                });
            });
        },
        hideOrders: function(){
            T.async(function() {
                T.async(function() {
                    T.addClass('orders-page','right-side');
                });
                T.hideOverlay('main');
            });
        }
    },
    modal: {
        show: function(){
            T.addClass(document.body, 'modal')
        },
        hide: function(){
            T.removeClass(document.body, 'modal')
        }
    },
    meals: {
        show: function(_id){
            Models.loadMeal(_id);
            document.body.style.overflowY = 'hidden';
            T.show('meal');
            T.async(function() {
                T.removeClass('meal','bottom-side');
            });
            T.showOverlay(210, 'details');
        },
        hide: function(){

            T.async(function() {
                T.addClass('meal','bottom-side');
                T.async(function() {
                    T.hide('meal');
                    document.body.style.overflowY = null;
                }, 300);
            });
            T.hideOverlay('details');
        }
    },
    cart: {
        show: function(){
            T.async(function() {
                T.removeClass('cart-page','right-side');
            });
            T.showOverlay(210, 'details');
        },
        hide: function(){
            T.async(function() {
                T.addClass('cart-page','right-side');
            });
            T.hideOverlay('details');
        }
    },
    checkout: {
        show: function(){
            T.async(function() {
                T.removeClass('checkout-page','right-side');
            });
            T.showOverlay(210, 'details');
            T.hide('cart-bottom-block');
        },
        hide: function(){
            T.show('cart-bottom-block');
            T.async(function() {
                T.addClass('checkout-page','right-side');
            });
            T.hideOverlay('details');
        }
    },
    restaurants: {
        showDetails: function(_id){
            T.async(function() {
                T.showOverlay(110, 'main');
                T.async(function() {
                    T.removeClass('details', 'right-side');
                    T.removeClass('cart-bottom-block', 'right-side');
                    T.removeClass('back-btn', 'left-side');
                });

                //T.async(function() {
                //    T.byId('main-list').style.webkitOverflowScrolling = 'auto';
                //},500);
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
        select: function(_id) {
            Actions.map.setMarkerAsActive(_id);
            var restaurants = Data.restaurantsSorted;
            for (var i = 0, l = restaurants.length; i < l; i++) {
                if (restaurants[i]._id == _id) {
                    var prev = i - 1, next = i + 1;
                    if (i == 0) {
                        prev = l - 1;
                    }
                    if (i == l - 1) {
                        next = 0;
                    }
                    m.render(T.byId("main-map-restaurant-prev"), Views.restaurantsListItem(restaurants[prev]));
                    m.render(T.byId("main-map-restaurant-current"), Views.restaurantsListItem(restaurants[i]));
                    m.render(T.byId("main-map-restaurant-next"), Views.restaurantsListItem(restaurants[next]));
                    var result = restaurants[i];
                    result.next = restaurants[next]._id;
                    result.prev = restaurants[prev]._id;
                    Data.currentRestaurant = result;
                    break;
                }
            }
        }
    },
    map: {
        setMarkerAsActive: function(_id) {
            if (Data.currentRestaurant && App.map.markers[Data.currentRestaurant._id]) {
                App.map.markers[Data.currentRestaurant._id].setIcon(App.map.plainIcon);
                App.map.markers[Data.currentRestaurant._id].setZIndexOffset(0);
            }
            if (App.map.markers[_id]) {
                App.map.markers[_id].setIcon(App.map.activeIcon);
                App.map.markers[_id].setZIndexOffset(1000);
                var p = L.latLng(Data.restaurants[_id].lat, Data.restaurants[_id].lon);
                if (!App.map.getBounds().contains(p)) {
                    App.map.setView(p);
                }
            }
        },
        init: function(){
            App.map = L.map('main-map').setView(App.userPosition, 15);
            App.map.markers = [];
            L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                attribution: '',
                maxZoom: 18,
                detectRetina: true
            }).addTo(App.map);

            App.map.plainIcon = new L.Icon({
                className: '',
                iconUrl: 'img/map-marker.png',
                iconSize: [T.p(37.5), T.p(45)],
                iconAnchor: [T.p(17.5), T.p(42)]
            });
            App.map.activeIcon = new L.Icon({
                className: 'active',
                iconUrl: 'img/map-marker-active.png',
                iconSize: [T.p(70), T.p(80)],
                iconAnchor: [T.p(35), T.p(78)]
            });

            var pane = T.byId('main-map-restaurants');
            L.DomEvent.addListener(pane, 'mousedown', L.DomEvent.stopPropagation);
            L.DomEvent.addListener(pane, 'touchstart', L.DomEvent.stopPropagation);

            function onLocationFound(e) {
                var radius = e.accuracy / 2;
                L.marker(e.latlng, {icon: new L.Icon({
                    iconUrl: 'img/map-marker-me.png',
                    iconSize: [T.p(100), T.p(100)]
                })}).addTo(App.map).bindPopup("You are within " + radius + " meters from this point");
                App.userPosition = [e.latlng.lat, e.latlng.lng];
            }

            function onLocationError(e) {
                console.log(e.message);
            }

            App.map.on('locationfound', onLocationFound);
            App.map.on('locationerror', onLocationError);

            App.map.locate({setView: true, maxZoom: 13});

            App.mapRestaurantsScroller = new FTScroller(document.getElementById('main-map-restaurants'), {
                scrollingY: false,
                snapping: true,
                snapSizeX: T.w()-T.p(40),
                singlePageScrolls: true,
                scrollbars: false,
                bouncing: false,
                maxFlingDuration:500
            });

           App.mapRestaurantsScroller.scrollTo((T.w()-T.p(40))*2,false,0);

           App.mapRestaurantsScroller.addEventListener('segmentdidchange', function(e){
                if(e.segmentX != 2 && App.mapRestaurantsScroller.inTransition) {
                    if (e.segmentX == 1) {
                        Actions.restaurants.select(Data.currentRestaurant.prev);
                    } else {
                        Actions.restaurants.select(Data.currentRestaurant.next);
                    }
                }
               App.mapRestaurantsScroller.scrollTo((T.w()-T.p(40))*2, false, 0);
            });

            App.mapRestaurantsScroller.addEventListener('scrollstart', function(e){
                App.mapRestaurantsScroller.inTransition = 1;
            });

            App.mapRestaurantsScroller.addEventListener('scrollend', function(e){
                App.mapRestaurantsScroller.inTransition = 0;
            });
        }
    }
};
var Pages = {
    index: function(){

        m.module(T.byId('main-list'), T.module(Views.restaurantsList));
        m.module(T.byId('sidebar'), T.module(Views.sidebar));
        m.module(T.byId('main-tabpanel'), T.module(Views.tabbar));
        m.module(T.byId('details'), T.module(Views.details));
        m.module(T.byId('cart-bottom-block'), T.module(Views.cartBottomBlock));
        m.module(T.byId('meal'), T.module(Views.meal));
        m.module(T.byId('cart-page'), T.module(Views.cartPage));
        m.module(T.byId('checkout-page'), T.module(Views.checkoutPage));
        m.module(T.byId('modal'), T.module(Views.modal));
        m.module(T.byId('orders-page'), T.module(Views.ordersPage));

        if (!App.map) {
            Actions.map.init();
            /*Models.loadRestaurants(function(){
                Actions.restaurants.select(0);
            });*/
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

        /*
            T.addEvent("scroll", 'details', function(e){
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
        */
    }
};
var App = {
    userPosition: [59.335597, 18.063498],
    inTransition: false,
    lastScroll: 0,
    lastScrollPosition: -1,
    resizeScrollers: function(){
        App.mapRestaurantsScroller.setSnapSize(T.w()-T.p(40), null);
        App.mapRestaurantsScroller.inTransition = 0;
        App.mapRestaurantsScroller.scrollTo((T.w()-T.p(40))*2, false, 0);
        App.map.plainIcon.options.iconSize = [T.p(37.5), T.p(45)];
        App.map.plainIcon.options.iconAnchor = [T.p(17.5), T.p(42)];
        App.map.activeIcon.options.iconSize = [T.p(70), T.p(80)];
        App.map.activeIcon.options.iconAnchor = [T.p(35), T.p(78)];
        T.each(App.map.markers, function(marker){
            if (typeof(marker)!='undefined') {
                if (marker._icon.currentSrc.indexOf('active')>-1) {
                    marker.setIcon(App.map.activeIcon);
                } else {
                    marker.setIcon(App.map.plainIcon);
                }
            }
        })
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
                location.href = '#/restaurant/'+el.getAttribute('data-id');
            }
        });
        T.liveEvent(['mouseup','touchend'], 'main-map-restaurant-block', function(e, el){
            if (!App.mapRestaurantsScroller.inTransition) {
                location.href = '#/restaurant/'+Data.currentRestaurant._id;
            }
        });

    },
    init: function(){
        FastClick.attach(document.body);
        T.checkStandalone();
        T.calculateScale();
        T.resizeStyles(2);
        Models.init();
        Models.initRestaurants();
        App.initLiveEvents();
        Pages.index();

        m.route.mode = "hash";
        T.async(function(){
            Router.map("#/map").to(function(){
                Actions.navigation.hideOrders();
                Actions.restaurants.hideDetails();
                Actions.navigation.showMap();
            });
            Router.map("#/list").to(function(){
                Actions.navigation.hideOrders();
                Actions.restaurants.hideDetails();
                Actions.navigation.showRestaurantsList();
            });
            var preloadRestaurants = function (){
                Actions.checkout.hide();
                Actions.cart.hide();
                Actions.meals.hide();
                var _id = this.params['id'];
                if (Object.keys(Data.restaurants).length) {
                    if (Data.restaurants[_id]) {
                        if (_id != Data.currentRestaurant._id) {
                            Actions.restaurants.select(_id);
                        }
                        Actions.restaurants.showDetails();
                    }
                } else {
                    var self = this;
                    T.async(function(){
                        preloadRestaurants.call(self);
                    }, 200);
                }
            };
            Router.map("#/restaurant/:id").to(preloadRestaurants);

            Router.map("#/orders").to(function(){
                Actions.checkout.hide();
                Actions.cart.hide();
                Actions.meals.hide();
                Actions.restaurants.hideDetails();
                Actions.navigation.showOrders();
            });

            Router.map("#/restaurant/:id/cart").to(function(){
                Actions.checkout.hide();
                Actions.meals.hide();
                if (!Object.keys(Data.restaurants).length) {
                    location.href = "#/restaurant/"+this.params['id'];
                } else {
                    Actions.cart.show();
                }
            });

            Router.map("#/restaurant/:id/checkout").to(function(){
                Actions.meals.hide();
                if (Object.keys(Data.restaurants).length) {
                    Actions.checkout.show();
                } else {
                    setTimeout(Actions.checkout.show, 1000);
                }
            });

            Router.map("#/restaurant/:id/meal/:mealId").to(function route(){
                var _id = this.params.id;
                if (Object.keys(Data.restaurants).length) {
                    if (Data.restaurants[_id]) {
                        if (_id != Data.currentRestaurant._id) {
                            Actions.restaurants.select(_id);
                        }
                        Actions.restaurants.showDetails();
                        Actions.meals.show(this.params.mealId);
                    }
                } else {
                    var self = this;
                    T.async(function(){
                        route.call(self);
                    }, 200);
                }
            });
            Router.map("#/restaurant/:id/cart/meal/:mealId").to(function route(){
                var _id = this.params.id;
                if (Object.keys(Data.restaurants).length) {
                    if (Data.restaurants[_id]) {
                        if (_id != Data.currentRestaurant._id) {
                            Actions.restaurants.select(_id);
                        }
                        Actions.restaurants.showDetails();
                        Actions.meals.show(this.params.mealId);
                    }
                } else {
                    var self = this;
                    T.async(function(){
                        route.call(self);
                    }, 200);
                }
            });
            Router.map("#/restaurant/:id/checkout/meal/:mealId").to(function route(){
                var _id = this.params.id;
                if (Object.keys(Data.restaurants).length) {
                    if (Data.restaurants[_id]) {
                        Actions.meals.show(this.params.mealId);
                    }
                }
            });
            Router.root("#/map");
            Router.listen();
        }, 200);
    }
};
window.addEventListener('load', function() {
    App.init();
    window.scrollTo( 0, 0 );
}, false);

window.addEventListener('unload', function() {
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