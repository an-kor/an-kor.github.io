var Pages = {
    restaurantsList: function(){
        if (!App.userRole) {App.router.setRoute('/login'); return;}
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
    restaurantMapSelector: function(){
        $(".input-address").geocomplete({
            types: ['geocode', 'establishment'],
            country: 'se'
        }).bind("geocode:result", function(event, result){
            var location = result.geometry.location.toString();
            location = location.substring(1,location.length - 1).split(', ');
            $('.input-lat').val(location[0]);
            $('.input-lon').val(location[1]);
        });

        $('#map-modal').on('shown.bs.modal', function (e) {
            var lat =  $('.input-lat').val(), lon = $('.input-lon').val();
            if (!lat) {
                lat = 59.335597;
                lon = 18.063498;
            }
            if (App.map) {
                App.map.remove();
            }
            App.map = L.map('map_canvas').setView([lat, lon], 15);
            L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                attribution: '',
                maxZoom: 19,
                detectRetina: true
            }).addTo(App.map);

            App.map.on('dragstart', function(e) {
                App.mapMarker.dragging.disable();
            });
            App.map.on('dragend', function(e) {
                App.mapMarker.dragging.enable()
            });

            App.mapMarker = L.marker([lat, lon]).addTo(App.map, {draggable: true});
            App.mapMarker.on('dragend', function(e){
                var location = e.target.getLatLng();
                $('.input-lat').val(location.lat);
                $('.input-lon').val(location.lng);
            });
            App.mapMarker.dragging.enable()

        });

    },
    restaurantCreate: function(){
        if (!App.userRole) {App.router.setRoute('/login'); return;}
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
        Pages.restaurantMapSelector();
    },
    restaurantInfo: function(restaurantKey){
        if (!App.userRole) {App.router.setRoute('/login'); return;}
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
                content: Templates.restaurantInfo({
                    isMain: true,
                    key: restaurantKey
                })
            }));
            App.renderPage();

            $('#restaurantInfo-main').html(Templates.restaurantCreate(restaurant));

            Pages.restaurantMapSelector();
        });
    },
    restaurantMenu: function(restaurantKey){
        if (!App.userRole) {App.router.setRoute('/login'); return;}
        Models.restaurant.getInfo(restaurantKey, function(restaurant){
            Models.restaurant.getMenu(restaurantKey, function(sections){
                var menu = {};
                if (!sections) {
                    menu = {
                        isEmpty: true
                    };
                }
                App.breadcrunbs = [{
                    name: 'Restaurants',
                    url: '/restaurants'
                },{
                    name: 'Detail info',
                    url: '/restaurants/'+restaurantKey
                },{
                    name: 'Menu'
                }];
                App.title = restaurant.name;

                $('#content-container').html(Templates.content({
                    title: App.title,
                    content: Templates.restaurantInfo({
                        isMenu: true,
                        key: restaurantKey
                    })
                }));
                App.renderPage(false);
                menu.key = restaurantKey;
                $('#restaurantInfo-menu').html(Templates.restaurantMenu(menu));
                $('#menu-sections').html(Templates.restaurantMenuSections(sections))
            });
        });
    },
    restaurantStaff: function(restaurantKey){
        if (!App.userRole) {App.router.setRoute('/login'); return;}
        Models.restaurant.getInfo(restaurantKey, function(restaurant){
            Models.staff.list(restaurantKey, function(staff){
                var menu = {};
                App.breadcrunbs = [{
                    name: 'Restaurants',
                    url: '/restaurants'
                },{
                    name: 'Detail info',
                    url: '/restaurants/'+restaurantKey
                },{
                    name: 'Staff members'
                }];
                App.title = restaurant.name;

                $('#content-container').html(Templates.content({
                    title: App.title,
                    content: Templates.restaurantInfo({
                        isStaff: true,
                        key: restaurantKey
                    })
                }));
                App.renderPage(false);
                menu.key = restaurantKey;
                menu.staff = staff;
                $('#restaurantInfo-staff').html(Templates.staffList(menu));
            });
        });
    },
    login: function(restaurantKey){
        $('#login').html(Templates.login());
    }
};