var T = {
    isIOS: /iP(ad|hone|od)/.test(navigator.userAgent),
    isIPad: /iPad/.test(navigator.userAgent),
    isWebkit: /WebKit/.test(navigator.userAgent),
    isDesktop: !("ontouchstart" in document.documentElement),
    isChrome: /Chrome/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    isAndroid2: /Android 2/.test(navigator.userAgent),
    isStandalone: false,
    getIOSVersion: function(){
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    },
    checkStandalone: function(){
        if ( this.isIOS ) {
            var v = this.getIOSVersion();
            if (v[0] >= 7) {
                if (navigator.isStandalone) {
                    T.isStandalone = true;
                } else {
                    var safari = /safari/i.test( navigator.userAgent );
                    if ( !safari ) {
                        T.isStandalone = true;
                    }
                }
            }
        }
    },
    scale: 1,
    byId: function (id){
        return document.getElementById(id);
    },
    remove: function(id) {
        var el = T.byId(id);
        el.parentElement.removeChild(el);
    },
    query: function (query, onlyFirst){
        var result = document.querySelectorAll(query);
        if ((result.length == 1 || onlyFirst) && onlyFirst !== false) {
            return result[0]
        } else {
            return result
        }
    },
    each: function (el, callback){
        var i = 0;
        if (el!=null) {
            if (!el.length) {
                return callback(el);
            }
            while (i < el.length) {
                callback(el[i]);
                i++;
            }
            return true;
        }
    },
    w: function (){
        return window.innerWidth;
    },
    h: function (){
        if (T.isAndroid) {
            var height = screen.availHeight;
            if (Math.abs(window.orientation) == 90) {
                height = screen.availWidth;
            }
            if (window.innerHeight>((height/window.devicePixelRatio)*0.6)) {
                return window.innerHeight
            } else {
                return (height-window.screenTop)/window.devicePixelRatio
            }
        } else {
            if (T.isStandalone) {
                return (window.innerHeight - 20);
            } else {
                return window.innerHeight;
            }
        }
    },
    p: function(v, ceil){
        if (ceil) {
            return Math.ceil(this.scale*v);
        }
        return parseFloat((this.scale*v).toFixed(3));
    },
    px: function(){
        return this.p.apply(this, arguments) + 'px';
    },
    setW: function (el, v){
        T.byId(el).style.width = v + 'px';
    },
    setH: function (el, v){
        T.byId(el).style.height = v + 'px';
    },
    inArray: function (needle, haystack, field) {
        var found = false, key;
        for (key in haystack) {

            if ((field && haystack[key][field] == needle) || (!field && haystack[key] == needle)) {
                found = key;
                break;
            }
        }
        return found;
    },
    updateStyle: function(selector, obj, value){
        var css = document.styleSheets[1], rules = css.cssRules;
        for (var i in rules) {
            if (rules[i].selectorText && rules[i].selectorText == selector){
                if (typeof(value) != 'undefined') {
                    rules[i].style[obj] = value;
                } else {
                    for (var key in obj) {
                        rules[i].style[key] = obj[key];
                    }
                }
                break;
            }
        }
    },
    url: './controller.php',
    request: function(action, callback, params, errorCallback, timeout) {
        if (!timeout) {
            timeout = 20000;
        }
        if (!params) {
            params = {action: action}
        } else {
            params.action = action;
        }
        params.apikey = "a4Gsm";
        T.xhrReq({
            url: T.url,
            dataType: 'text',
            type: 'POST',
            timeout: timeout,
            data: params,
            success: function(data){
                try {
                    callback(JSON.parse(data));
                } catch(e) {
                     console.error('error on parsing data', data)
                     console.error(e)
                     errorCallback();
                }
            },
            error: function(data){
                App.showNoConnection();
                errorCallback(data);
            }
        })
    },
    formatNumber: function(value){
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    initHover: function(elements, bgHoverColor, bgColor, useBackground){
        if (!elements.length) {
            elements = [elements];
        }
        if (!bgColor) {
            bgColor = null;
        }
        for (var i=0;i<elements.length;i++) {
            elements[i].addEventListener('touchstart', function() {
                if (useBackground) {
                    this.style.background = bgHoverColor;
                } else {
                    this.style.backgroundColor = bgHoverColor;
                }
            });
            elements[i].addEventListener('touchend', function() {
                this.style.backgroundColor = bgColor;
            });
        }
    },
    preloadImages: function() {
        var imagestList = ['img/broken_tag.png', 'img/loadinfo-blue.gif', 'img/clock.png', 'img/loadinfo.gif', 'img/share-btn-new.png', 'img/gesture-h.png', 'img/gesture-v.png', 'img/logo-small.png', 'img/back-btn.png'];
        for (var i in imagestList) {
            try {
                var img = new Image();
                img.src = imagestList[i];
            } catch (e) { }
        }
    },
    getDistance: function(from, to){
        to.Lat = parseFloat(to[0]);
        to.Lon = parseFloat(to[1]);
        from.Lat = parseFloat(from[0]);
        from.Lon = parseFloat(from[1]);

        this.R = 6378.137;
        this.d2r = Math.PI / 180;
        this.dLat = (to.Lat-from.Lat) * this.d2r;
        this.dLon = (to.Lon-from.Lon) * this.d2r;
        this.lat1 = from.Lat * this.d2r;
        this.lat2 = to.Lat * this.d2r;
        this.sin1 = Math.sin(this.dLat / 2);
        this.sin2 = Math.sin(this.dLon / 2);

        this.a = this.sin1 * this.sin1 + this.sin2 * this.sin2 * Math.cos(this.lat1) * Math.cos(this.lat2);
        this.d = this.R * 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1 - this.a));

        return this.d;
    },
    stopScrolling: function(el){
        clearInterval(App.scrollInterval);
        App.scrollInterval = 0;
        App.isScrolling = 0;
        App.scrollCounter = 0;
        T.byId('footer').innerHTML = 'not scrolling';
    },
    checkScrolling: function(event, el){
        //T.byId('footer').innerHTML = Math.abs(event.touches[0].pageX - App.scrollStartEvent.x)+ ' ' + Math.abs(event.touches[0].pageY - App.scrollStartEvent.y);
        if (!App.isScrolling && (Math.abs(event.touches[0].pageX - App.scrollStartEvent.x) > 10 || Math.abs(event.touches[0].pageY - App.scrollStartEvent.y) > 10)) {
            App.isScrolling = 1;
            App.currentTop = el.scrollTop;
            App.scrollCounter = 0;
            if (!App.scrollInterval) {
                App.scrollInterval = setInterval(function () {
                    T.byId('footer').innerHTML = 'scrolling' + el.scrollTop + ' ' + App.currentTop + ' ' + App.scrollCounter;
                    if (Math.abs(el.scrollTop - App.currentTop) < 10) {
                        App.scrollCounter++;
                    }
                    if ((App.scrollCounter > 3 && (el.scrollTop != App.currentTop)) || App.scrollCounter > 10) {
                        T.stopScrolling(el);
                    } else {
                        App.currentTop = el.scrollTop;
                    }
                }, 250);
            }
        }
    },
	getCountdownTime: function(countdown){
		countdown = parseInt(countdown, 10);
		var curTime = Math.floor(new Date().getTime() / 1000),
			delta = countdown - curTime,
			hours = Math.floor(delta/3600),
			minutes = Math.floor((delta - (hours*3600))/60),
			seconds = (delta - (hours*3600) - (minutes*60));
		if (delta>0) {
			if (hours < 10) {
				hours = '0' + hours;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			return hours + ":" + minutes + ":" + seconds;
		} else {
			return '00:00:00';
		}
	}
};

(function($) {
    var win=window, xhrs = [
            function () { return new XMLHttpRequest(); },
            function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
            function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
            function () { return new ActiveXObject("MSXML2.XMLHTTP"); }
        ],
        _xhrf = null;
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        nativeForEach = Array.prototype.forEach;

    $.xhr = function () {
        if (_xhrf != null) return _xhrf();
        for (var i = 0, l = xhrs.length; i < l; i++) {
            try {
                var f = xhrs[i], req = f();
                if (req != null) {
                    _xhrf = f;
                    return req;
                }
            } catch (e) {
                continue;
            }
        }
        return function () { };
    };
    $._xhrResp = function (xhr) {
        if (xhr.getResponseHeader("Content-Type")) {
            switch (xhr.getResponseHeader("Content-Type").split(";")[0]) {
                case "text/xml":
                    return xhr.responseXML;
                case "text/json":
                case "application/json":
                case "text/javascript":
                case "application/javascript":
                case "application/x-javascript":
                    return win.JSON ? JSON.parse(xhr.responseText) : eval(xhr.responseText);
                default:
                    return xhr.responseText;
            }
        } else {
            return '';
        }
    };
    $._formData = function (o) {
        var kvps = [], regEx = /%20/g;
        for (var k in o) kvps.push(encodeURIComponent(k).replace(regEx, "+") + "=" + encodeURIComponent(o[k].toString()).replace(regEx, "+"));
        return kvps.join('&');
    };
    $.xhrReq = function (o) {
        var xhr = $.xhr(), timer, n = 0;
        o.userAgent = "XMLHttpRequest";
        o.lang = "en";
        o.dataType = "application/x-www-form-urlencoded";
        if (o.timeout) timer = setTimeout(function () { xhr.abort(); if (o.timeoutFn) o.timeoutFn(o.url); }, o.timeout);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (timer) clearTimeout(timer);
                if (xhr.status >0 && xhr.status < 300) {
                    if (o.success) o.success($._xhrResp(xhr));
                }
                else if (o.error) o.error(xhr, xhr.status, xhr.statusText);
                if (o.complete) o.complete(xhr, xhr.statusText);
            }
            else if (o.progress) o.progress(++n);
        };
        var url = o.url, data = null;
        var nocache = new Date().getTime();
        var isPost = o.type == "POST" || o.type == "PUT";
        if (!isPost && o.data)  {
            url += "?" + $._formData(o.data);
        } else {
            if (!o.cached) {
                url += "?ts=" + nocache;
            }
        }
        xhr.open(o.type, url);

        if (isPost) {
            var isJson = o.dataType.indexOf("json") >= 0;
            data = isJson ? JSON.stringify(o.data) : $._formData(o.data);
            xhr.setRequestHeader("Content-Type", isJson ? "application/json" : "application/x-www-form-urlencoded");
        }
        xhr.send(data);
    };
})(window.T);
