var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    	document.getElementById('splash').ontouchend = app.checkConnection;
    },
    onDeviceReady: function() {
    	app.checkConnection();
    },
    checkConnection: function(){
        var showError = function(msg) {
            navigator.splashscreen.hide();

            document.getElementById('splash-loading').style.display = 'none';
            document.getElementById('splash-message').innerHTML = msg;
            document.getElementById('splash-button').innerHTML = 'försök igen';
        }   
    	var networkState = navigator.connection.type;
    	var errorMsg = '<strong>Kunde inte ladda deals!</strong><br/>Vänligen kontrollera er internetuppkoppling';
    	var noConnectionMsg = '<strong>Kunde inte ladda deals!</strong><br/>Vänligen kontrollera er internetuppkoppling';
        var noConnection = function(){
            showError(noConnectionMsg);
        }
        var checkHost = function(url){
            //navigator.splashscreen.show();
            document.getElementById('splash-loading').style.display = 'block';
            document.getElementById('splash-tag').style.display = 'none';
            document.getElementById('splash-message').style.display = 'none';
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', url, true);
            xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == 4) {
                 if(xmlhttp.status == 200) {
                     location.href = url;
	             } else {
	            	 showError(errorMsg);
	             }
              }
            };
            xmlhttp.send(null);
            var timeout = setTimeout( function(){ xmlhttp.abort(); showError(errorMsg); }, 5000);
        }
        
        if (networkState == Connection.NONE) {
            noConnection();
            setInterval(app.checkConnection, 5000);
        } else {
        	var url = 'http://touch.letsdeal.se';
            //var url = 'http://144.76.56.236';
        	//  var url = 'http://192.168.2.168/an-kor.github.io/letsdeal/';
            checkHost(url);
        }
    }
};
