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

    App.init();