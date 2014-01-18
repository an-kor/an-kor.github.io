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
        }   
    	var networkState = navigator.connection.type;
    	var errorMsg = '<strong>Kunde inte ladda deals!</strong><br/>Vänligen kontrollera er internetuppkoppling och försök igen';
    	var noConnectionMsg = '<strong>Kunde inte ladda deals!</strong><br/>Vänligen kontrollera er internetuppkoppling och försök igen';
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
            var url = 'http://217.14.196.170:8102';
        	// var url = 'http://192.168.0.78/an-kor.github.io/letsdeal/';
            checkHost(url);
        }
    }
};
