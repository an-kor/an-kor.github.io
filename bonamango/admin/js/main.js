var initSaltkin = function(){

    "use strict";

    // Fix height
    var winHeight = $(window).height();
    var docHeight = $(document).height();
    if(winHeight > docHeight) {
        docHeight = winHeight;
    }
    $("#sidebar").css('min-height', docHeight);
    $("#content").css('min-height', docHeight);

    // Show sidebar submenu
    $(".has-submenu").click(function(e) {
        //$(this).toggleClass("active");
        $('.sidebar-group li').removeClass('active');
        $(this).closest('li').addClass('active');
    });

    // Collapse sidebar
    $("#make-compact").click(function(e) {
        //e.preventDefault();
        $("body").toggleClass("compact-sidebar");
    });

    // Toggle menu on mobile
    $("#toggle-menu").click(function(e) {
        e.preventDefault();
        $("body").removeClass("compact-sidebar");
        $("body").toggleClass("show-menu");
    });

    $("#hide-menu").click(function(e) {
        e.preventDefault();
        $("body").removeClass("compact-sidebar");
        $("body").removeClass("show-menu");
    });

    // Compact sidebar on mobiles fix
    $(window).resize(function(){
        if ($("#make-compact").css("display") == "none" ){
            $("body").removeClass("compact-sidebar");
        }
    });

};
var Templates = {};
var App = {
    data: {},
    breadcrunbs: [],
    renderPage: function(){
        if (App.breadcrunbs.length) {
            App.breadcrunbs[App.breadcrunbs.length-1].last = 1;
        }
        $('#header-container').html(Templates.header({
            title: App.title,
            breadcrunbs: App.breadcrunbs
        }));

        $.map(Events, function(el){
            el.off("child_added");
            el.off("child_changed");
            el.off("child_removed");
        });

        var route = window.location.hash.substr(1);
        //$('.sidebar-group').find('.active').removeClass('active');
        $('.sidebar-submenu li').removeClass('active');
        $('[data-url="'+route+'"]').addClass('active');
        $('[data-url="'+route+'"]').parent().parent().addClass('active');
    },
    redirect: function(to) {
        return function(){
            console.log('redirecting to %s', to);
            setTimeout(function(){
                page(to);
            }, 0); // TODO: lame
        }
    },
    init: function(){
        FastClick.attach(document.body);

        Templates.header = Handlebars.compile($('#header-template').html());
        Templates.content = Handlebars.compile($('#content-template').html());
        Templates.restaurantList  = Handlebars.compile($('#restaurantList-template').html());
        Templates.restaurantListElement  = Handlebars.compile($('#restaurantListElement-template').html());
        Templates.restaurantInfo  = Handlebars.compile($('#restaurantInfo-template').html());
        Templates.restaurantCreate  = Handlebars.compile($('#restaurantCreate-template').html());
        $('#sidebar-container').html($('#sidebar-template').html());
        //$('#header-container').html($('#header-template').html());
        //$('#content-container').html($('#content-template').html());
        initSaltkin();

        var routes = {
            '/restaurants': Pages.restaurantsList,
            '/restaurants/list': Pages.restaurantsList,
            '/restaurants/add': Pages.restaurantCreate,
            '/restaurants/:restaurantId': Pages.restaurantInfo
        };

        App.router = Router(routes);
        App.router.init('/restaurants/list');
    }
};
var Pages = {
    restaurantsList: function(){
        App.breadcrunbs = [{
            name: 'Restaurants',
            url: '/restaurants/list'
        },{
            name: 'List'
        }];
        App.title = 'List of restaurants';

        $('#content-container').html(Templates.content({
            title: false,
            content: Templates.restaurantList()
        }));

        $('.footable').footable();

        App.renderPage();
        Models.restaurant.list();
    },
    restaurantCreate: function(){
        App.breadcrunbs = [{
            name: 'Restaurants',
            url: '/restaurants'
        },{
            name: 'Add'
        }];
        App.title = 'New restaurant';

        $('#content-container').html(Templates.content({
            title: App.title,
            content: Templates.restaurantCreate({
                mode: 'add',
                isCreate: true
            })
        }));
        App.renderPage();
    },
    restaurantInfo: function(restaurantKey){

        Models.restaurant.getInfo(restaurantKey, function(restaurant){

            App.breadcrunbs = [{
                name: 'Restaurants',
                url: '/restaurants'
            },{
                name: 'Detail info'
            }];
            App.title = restaurant.name;

            $('#content-container').html(Templates.content({
                title: App.title,
                content: Templates.restaurantInfo()
            }));
            App.renderPage();

            $('#restaurantInfoTabBar a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            });

            $('#restaurantInfo-main').html(Templates.restaurantCreate(restaurant));

        });
    }
};
var Data = {
    fb: new Firebase("https://burning-heat-7084.firebaseio.com")
};
var Auth = new FirebaseSimpleLogin(Data.fb, function(){});
var Events = [];
var Models = {
    restaurant: {
        validate: function(){
            var passed = true;
            $.map(['#add-rest-name', '#add-rest-email'], function(el){
                if (!$(el).val()){
                    passed = false;
                    $(el).closest(".form-group").addClass("has-error");
                } else {
                    $(el).closest(".form-group").removeClass("has-error");
                }
            });
            if (!passed) {
                Utils.showAlert('Name and Manager\'s email are required fields');
            } else {
                Utils.hideAlert();
            }
            return passed;
        },
        getInfo: function(key, callback){
            var ref = Data.fb.child('restaurants')
                .startAt(key)
                .endAt(key)
                .once('value', function(snap) {
                    var restaurant = snap.val();
                    restaurant = restaurant[Object.keys(restaurant)[0]];
                    restaurant._id = Object.keys(snap.val())[0];
                    restaurant.mode = 'edit';
                    restaurant.isCreate = false;
                    console.log(restaurant);
                    callback(restaurant);
                });
        },
        list: function(){
            var ref = Data.fb.child('restaurants');
            var prepareElement =  function(snapshot){
                var message = snapshot.val();
                message.isActive = (message.status == 'active');
                message._id = snapshot.name();
                return message;
            };
            ref.on('child_added', function (snapshot) {
                $('.preloader').hide();
                var message = prepareElement(snapshot);
                $('#restaurantList').find('tbody').append(Templates.restaurantListElement(message));
                $('.footable').data('footable').redraw();
            });

            ref.on('child_changed', function (snapshot) {
                var message = prepareElement(snapshot);
                $('#restaurantListElement-'+snapshot.name()).replaceWith(Templates.restaurantListElement(message));
                $('.footable').data('footable').redraw();
            });

            ref.on('child_removed', function (snapshot) {
                $('#restaurantListElement-'+snapshot.name()).slideUp(400, function(){
                    $(this).remove();
                    $('.footable').data('footable').redraw();
                })
            });
            Events.push(ref);
        },
        update: function(restaurantId) {
            var newRecord = Data.fb.child('restaurants/'+restaurantId);
            newRecord.update({
                name: $('#edit-rest-name').val(),
                address: $('#edit-rest-address').val(),
                lat: $('#edit-rest-lat').val(),
                lon: $('#edit-rest-lon').val(),
                description: $('#edit-rest-description').val()
            });
        },
        remove: function(restaurantId) {
            var newRecord = Data.fb.child('restaurants/'+restaurantId);
            newRecord.remove();
            App.router.setRoute('/restaurants/list');
        },
        create: function(){
            var setUserPermissionForRestaurant =  function(userId, restaurantId) {
                Data.fb.child('userRestaurantsLink/'+userId).once('value', function (snap) {
                    if (snap.val() === null) {
                        Data.fb.child('userRestaurantsLink/'+userId).set(restaurantId);
                    } else {
                        var values = snap.val().split(',');
                        if (!$.inArray(restaurantId, values)) {
                            values.push(restaurantId);
                            Data.fb.child('userRestaurantsLink/'+userId).set(values.join(','));
                        }
                    }
                });
            };

            var createRestaurant =  function(userId) {
                var restaurantKey = ($('#add-rest-name').val()).toLowerCase().replace(' ', '');
                var newRecord = Data.fb.child('restaurants').push();
                newRecord.setWithPriority({
                    key: restaurantKey,
                    name: $('#add-rest-name').val(),
                    address: $('#add-rest-address').val(),
                    lat: $('#add-rest-lat').val(),
                    lon: $('#add-rest-lon').val(),
                    description: $('#add-rest-description').val(),
                    manager: $('#add-rest-email').val(),
                    status: 'disabled'
                }, restaurantKey, function(){
                    var restaurantId = newRecord.name();
                    setUserPermissionForRestaurant(userId, restaurantId);
                    App.router.setRoute('/restaurants/'+restaurantKey);
                });
            };

            if (Models.restaurant.validate()){
                var userEmail = $('#add-rest-email').val();
                var userPassword = $('#add-rest-password').val();
                Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).once('value', function (snap) {
                    if (snap.val() === null) {
                        if (userPassword == "") {
                            $('#add-rest-password').closest(".form-group").addClass("has-error");
                            Utils.showAlert('User not found, provide the password to create a new one');
                        } else {
                            var newUserRecord = Data.fb.child('users').push({
                                email: userEmail,
                                password: userPassword
                            }, function(){
                                var userId = newUserRecord.name();
                                Data.fb.child('usersIndex/'+Utils.escapeEmail(userEmail)).set(userId);
                                Auth.createUser(userEmail, userPassword, function(error, user) {
                                    if (error === null) {
                                        console.log("User created successfully:", user);
                                    } else {
                                        console.log("Error creating user:", error);
                                    }
                                });
                                createRestaurant(userId);
                            });
                        }
                    } else {
                        createRestaurant(snap.val());
                    }
                });
            }

            //ref.push({ 'title': title, 'parent': parent });
        }
    }
};

var Utils = {
    escapeEmail: function(email) {
        return (email || '').replace('.', ',');
    },
    unescapeEmail: function(email) {
        return (email || '').replace(',', '.');
    },
    showAlert: function(text){
        $('#alert-container > div').html(text);
        $('#alert-container').show();
    },
    hideAlert: function(text){
        $('#alert-container').hide();
    }
};

window.addEventListener('DOMContentLoaded', function() {
    App.init();
    window.scrollTo( 0, 0 );
});
