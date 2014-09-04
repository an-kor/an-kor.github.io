$(function($){
    FastClick.attach(document.body);
    $('#map').height(window.innerHeight);
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

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});


    var w = window.innerWidth;

    var page = Impulse($('#map, #list'))
        .style('translate', function(x, y) {
            return x + 'px, 0px'
        });
    $('#topbar-list-button').on('click', function(){
        $('#list').show();
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        page.spring({ tension: 100, damping: 15 })
            .from(0, 0).to(-w, 0).start()
    });
    $('#topbar-map-button').on('click', function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        page.spring({ tension: 100, damping: 15 })
            .from(-w, 0).to(0, 0).start()
    });

    menuPage = Impulse($('#menu-page, #home'))
        .style('translate', function(x, y) {
            return x + 'px, 0px'
        });
});


var menuPage;
function changePage(){
    $('.go-back').css('visibility','');
    $('#cart').show();
    $('#menu-page').show();
    menuPage.spring({ tension: 100, damping: 15 })
        .from(0, 0).to(-window.innerWidth, 0).start()
}

function back(){
    $('.go-back').css('visibility','hidden');
    $('#cart').hide();
    setTimeout(function(){
        $('#menu-page').hide();
    }, 300);
    menuPage.spring({ tension: 100, damping: 15 })
        .from(-window.innerWidth*2, 0).to(0, 0).start()
}