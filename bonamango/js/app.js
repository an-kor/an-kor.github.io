    FastClick.attach(document.body);
    var $$ = Dom7;
	var App = new Framework7({
        fastClicks:false,
		swipePanel: 'left',
        animateNavBackIcon: true,
        init: false
	});
    var mainView = App.addView('.view-main', {
        dynamicNavbar: true
    });

    App.onPageInit('contact', function (page) {
        var mySlider = App.slider('.slider-container', {
            pagination:'.slider-1 .slider-pagination',
            spaceBetween: 50,
            speed: 600
        });

        var myPhotoBrowserDark = App.photoBrowser({
            photos : [
                'http://lorempixel.com/1024/1024/food/1/',
                'http://lorempixel.com/1024/1024/food/2/',
                'http://lorempixel.com/1024/1024/food/3/'
            ],
            theme: 'dark'
        });
        $$('.slider-wrapper').on('click', function () {
            myPhotoBrowserDark.open();
        });

    });
    App.onPageInit('index', function (page) {
        //$$('#map').height(window.innerHeight);
        var map = L.map('map').setView([59.335597, 18.063498], 13);
        L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
            attribution: '',
            maxZoom: 19,
            detectRetina: true
        }).addTo(map);

        var redMarker = L.AwesomeMarkers.icon({
            icon: 'coffee',
            markerColor: 'red'
        });


        function onLocationFound(e) {
            var radius = e.accuracy / 2;

            L.marker(e.latlng, {icon: L.AwesomeMarkers.icon({icon: 'user', prefix: 'fa', markerColor: 'blue'}) }).addTo(map)
                .bindPopup("You are within " + radius + " meters from this point");
            console.log(e.latlng)

            L.marker([e.latlng.lat + 0.001, e.latlng.lng - 0.001], {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red'}) }).addTo(map).on('click', function(){changePage()});
            L.marker([e.latlng.lat - 0.00015, e.latlng.lng + 0.0015], {icon: L.AwesomeMarkers.icon({icon: 'glass', prefix: 'fa', markerColor: 'green'}) }).addTo(map).on('click', function(){changePage()});
            L.marker([e.latlng.lat - 0.00025, e.latlng.lng - 0.0025], {icon: L.AwesomeMarkers.icon({icon: 'gift', prefix: 'fa', markerColor: 'orange'}) }).addTo(map).on('click', function(){changePage()});

        }
        var changePage = function(){
            mainView.loadPage('contact.html');
        }

        function onLocationError(e) {
            alert(e.message);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: true, maxZoom: 16});
    });

    App.onPageInit('contact', function (page) {
        $$('.accordion-item-content .item-content').on('click', function () {
            var popupHTML = function(){
                return '<div class="popup">'+

                    '<div class="content-block">'+
                    '<div class="popup-image"><img src="http://www.delivery-club.ru/pcs/777/3882746_s.jpg"></div>'+
                    '<div class="popup-header1">Shirazisallad</div>'+
                    '<div class="popup-text">Tomater (färska), Lök, Mynta, Gurka</div>'+
                    '<div class="popup-header2">Size</div>'+
                    '<p class="buttons-row">'+
                    '<a href="#" class="button active">Standart</a>'+
                    '<a href="#" class="button">Extra big</a>'+
                    '</p>'+
                    '<div class="buttons-block row">'+
                    '<div class="col-50">'+
                    '<a href="#" class="close-popup button button-big color-black">Cancel</a>'+
                    '</div>'+
                    '<div class="col-50">'+
                    '<a href="#" class="close-popup button button-big button-fill color-green">35.00 KR</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+

                '</div>';
            };
            App.popup(popupHTML());
        });
    });

    App.onPageInit('order', function (page) {
        $$('.edit').on('click', function () {
            var popupHTML = function(){
                return '<div class="popup">'+

                    '<div class="content-block">'+
                    '<div class="popup-image"><img src="http://www.delivery-club.ru/pcs/777/3882746_s.jpg"></div>'+
                    '<div class="popup-header1">Shirazisallad</div>'+
                    '<div class="popup-text">Tomater (färska), Lök, Mynta, Gurka</div>'+
                    '<div class="popup-header2">Size</div>'+
                    '<p class="buttons-row">'+
                    '<a href="#" class="button active">Standart</a>'+
                    '<a href="#" class="button">Extra big</a>'+
                    '</p>'+
                    '<div class="buttons-block row">'+
                    '<div class="col-33">'+
                    '<a href="#" class="close-popup button button-big color-black">Cancel</a>'+
                    '</div>'+
                    '<div class="col-33">'+
                    '<a href="#" class="close-popup button button-big button-fill color-green">Add</a>'+
                    '</div>'+
                    '<div class="col-33">'+
                    '<a href="#" class="close-popup button button-big button-fill color-red">Remove</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+

                    '</div>';
            };
            App.popup(popupHTML());
        });
    });

    var showModals = false;
    App.onPageInit('thankyou', function (page) {
            if (!showModals) {
                setTimeout(function(){
                    showModals = true;
                    App.addNotification({
                        title: 'Order status changed',
                        message: 'Your order has been confirmed by the restaurant',
                        hold: 2000
                    });
                    $$('#reject').hide();
                }, 1500);

                setTimeout(function(){
                    App.modal({
                        text: 'Preparation time is 26 minutes. Do you accept this?',
                        title: 'Order 123456 confirmed',
                        buttons: [
                            {text: 'Reject it', onClick: function() {}},
                            {text: 'OK', bold: true, onClick:  function() {}}
                        ]
                    });
                    $$('#waiting').hide();
                    $$('#confirmed').show();
                }, 5000);
            }
    });

    App.init();