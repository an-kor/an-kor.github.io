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
    async: function(f, timeout){
        if (!timeout) timeout = 0;
        setTimeout(f, timeout);
    },
    addEvent: function(events, el, callback){
        if (typeof(events)=='string') {
            events = [events];
        }

        var elId;
        if (typeof(el)=='string') {
            elId = el;
            el = T.byId(el);
        } else {
            elId = el.id;
        }
        if (!Events[elId]) {
            Events[elId] = events;
            for (var i=0;i<events.length;i++) {
                el.addEventListener(events[i], callback, false);
            }
        }
    },
    liveEvent: function(events, className, callback){
        if (typeof(events)=='string') {
            events = [events];
        }
        for (var i=0;i<events.length;i++) {
            window.addEventListener(events[i], function(e){
                var el = e.target;
                while (el && el.parentNode != document.body) {
                    el = el.parentNode;
                    if (el && el.className && el.className.indexOf(className)>-1) {
                        callback(e, el);
                        break;
                    }
                }
            }, false);
        }
    },
    position: function(el) {
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        return el.getBoundingClientRect()
    },
    byId: function (id){
        return document.getElementById(id);
    },
    remove: function(el) {
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        el.parentElement.removeChild(el);
    },
    show: function(el) {
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        el.style.display = 'block';
    },
    hide: function(el) {
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        el.style.display = 'none';
    },
    addClass: function(el, className){
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        if (el && (!el.className || el.className.indexOf(className)==-1)) el.className += ' '+className;
    },
    removeClass: function(el, className){
        if (typeof(el)=='string') {
            el = T.byId(el);
        }
        if (el && el.className && el.className.indexOf(className)>-1) {
            el.className = el.className.replace(' '+className,'');
            el.className = el.className.replace(className,'');
        }
    },
    setContent: function(el, newContent){
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        el.appendChild(newContent);
    },
    prependChild: function(source, el){
        source.insertBefore(el,source.firstChild);
    },
    renderTpl: function(templateName, data){
        data.Data = Data;
        return (Templates[templateName].view(data)).render();
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
        var i;
        if (el!=null) {
            if (typeof(el) != 'object') {
                return callback(el);
            }
            if (!el.length) {
                for (i in el) {
                    if (el.hasOwnProperty(i)) {
                        callback(el[i], i);
                    }
                }
            } else {
                i = 0;
                while (i < el.length) {
                    callback(el[i], i);
                    i++;
                }
            }
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
            return Math.round(this.scale*v + 0.3);
        }
        return parseFloat(parseFloat((this.scale*v)).toFixed(3));
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
    calculateScale: function(){
        // calculate scale rate using user device's height and width
        var windowH = 1136, windowW = 800;
        if (T.isAndroid && T.isChrome) {
            windowW = windowW * 2;
        }
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / windowH;
        } else {
            T.scale = T.h() / windowW;
        }
    },
    camelCase: function(input) {
        if (input[0]=='-') {
            input = input.substr(1);
        }
        input = input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
        if (input.indexOf('moz')==0) {
            input = input[0].toUpperCase() + input.substr(1);
        }
        return input;
    },
    resizeStyles: function(cssIndex){
        var rules = document.styleSheets[cssIndex].cssRules, i = 0, style, parts, partId = 0, s = "";
        for (var currentRule in rules) {
            style = rules[currentRule].style;
            if (style && style.length) {
                for (i=0; i<style.length; i++) {
                    var styleName = style[i];
                    if (!style[styleName]) {
                        styleName = T.camelCase(styleName);
                        if (styleName.indexOf('Value')>-1) {
                            styleName = styleName.replace('Value', '');
                        }
                        if (styleName.indexOf('Rtl')>-1 || styleName.indexOf('Ltr')>-1) {
                            styleName = null;
                        }
                        if (styleName == 'float') {
                            styleName = 'cssFloat';
                        }
                    }
                    if (style[styleName]) {
                        parts = style[styleName].split(" ");
                        for (partId in parts) {
                            s = parts[partId];
                            if (s.indexOf('%') > -1 && s.indexOf('100.') > -1) {
                                var widthParts = s.substr(0, s.length - 2);
                                widthParts = widthParts.split('.');
                                if (styleName != 'height') {
                                    parts[partId] = (window.innerWidth - T.p(widthParts[1])) + 'px';
                                }
                            } else if (s.indexOf('px') > -1 && s.indexOf('085') > -1) {
                                parts[partId] = (T.p(parseInt(s), 1) + T.p(85, 1)) + 'px';
                            } else {
                                if (s.indexOf('px') > -1 && s.indexOf('.001') == -1) {
                                    parts[partId] = T.px(s.substr(0, s.length - 2), (s.indexOf('.002')>-1)?1:0);
                                }
                            }
                        }
                        document.styleSheets[cssIndex + 1].cssRules[currentRule].style[styleName] = parts.join(" ");
                    } else {
                    }
                }
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
        if (isNaN(parseFloat(this.d)) || this.d > 4000) this.d = 0;
        return this.d;
    },
    showOverlay: function(zIndex, parent){
        if (!T.byId(parent+'-overlay-bg')) {
            var bg = document.createElement('div');
            bg.id=parent+'-overlay-bg';
            bg.className='overlay-bg';
            bg.style.zIndex = zIndex;
            T.byId(parent).appendChild(bg);
            T.async(function() {
                bg.style.opacity = 1;
            });
        }
    },
    hideOverlay: function(parent){
        var id = parent+'-overlay-bg';
        T.async(function () {
            T.byId(id).style.opacity = 0;
            T.async(function () {
                T.remove(id);
            }, 250);
        });
    },
    job: function(data, job){
        if(typeof(Worker) !== "undefined") {
            Architect.proxy(data, job);
        } else {
            T.async(job);
        }
    },
    getLogoUrl : function(el){
        var logoId = '-empty';
        if (el.key.indexOf('ichaicha')>-1) {
            logoId = '-ichaicha';
        }
        if (el.name.indexOf('reen dr')>-1) {
            logoId = '-green';
        }
        if (el.name.indexOf('team')>-1) {
            logoId = '-steam';
        }
        if (el.name.indexOf('uiceverk')>-1 ) {
            logoId = '-juiceverket';
        }
        if (el.key.indexOf('martinsgrona')>-1) {
            logoId = '-martinsgrona';
        }
        if (el.name.toLowerCase().indexOf('ho')==0 ) {
            logoId = '-ho';
        }
        if (el.name.toLowerCase().indexOf('falafel')==0 ) {
            logoId = '-falafel';
        }
        if (el.name.toLowerCase().indexOf('chutney')==0 ) {
            logoId = '-chutney';
        }
        if (el.name.toLowerCase().indexOf('bagel')==0 ) {
            logoId = '-bagel';
        }
        if (el.name.toLowerCase().indexOf('kalori')==0 ) {
            logoId = '-kalori';
        }
        if (el.name.toLowerCase().indexOf('8t8')==0 ) {
            logoId = '-8t8';
        }
        if (el.name.toLowerCase().indexOf('babel')>-1 ) {
            logoId = '-babel';
        }
        if (el.name.toLowerCase().indexOf('noodle')>-1 ) {
            logoId = '-noodle';
        }
        if (el.name.toLowerCase().indexOf('organic green')>-1 ) {
            logoId = '-ogreen';
        }
        if (el.key.indexOf('phobun')>-1 ) {
            logoId = '-phobun';
        }
        if (el.key.indexOf('kimama')>-1 ) {
            logoId = '-kimama';
        }
        if (el.key.indexOf('matapoteket')>-1 ) {
            logoId = '-matapoteket';
        }
        if (el.key.indexOf('orkid')>-1 ) {
            logoId = '-orkide';
        }
        if (el.key.indexOf('vietnam')>-1 ) {
            logoId = '-vietnam';
        }
        if (el.key.indexOf('seyhmus')>-1 ) {
            logoId = '-seyhmus';
        }
        if (el.key.indexOf('arirang')>-1 ) {
            logoId = '-arirang';
        }
        if (el.key.indexOf('rossi')>-1 ) {
            logoId = '-rossi';
        }
        if (el.key.indexOf('mond')>-1 ) {
            logoId = '-mond';
        }
        if (el.key.indexOf('guru')>-1 ) {
            logoId = '-guru';
        }
        if (el.key.indexOf('govinda')>-1 ) {
            logoId = '-govindas';
        }
        if (el.key.indexOf('bliss')>-1 ) {
            logoId = '-bliss';
        }
        if (el.key.indexOf('rio')>-1 ) {
            logoId = '-rio';
        }
        if (el.key.indexOf('vurma')>-1 ) {
            logoId = '-vurma';
        }
        if (el.key.indexOf('akki')>-1 ) {
            logoId = '-akki';
        }
        if (el.key.indexOf('bonan')>-1 ) {
            logoId = '-bonan';
        }
        if (el.key.indexOf('koffie')>-1 ) {
            logoId = '-koffie';
        }
        if (el.key.indexOf('doctor')>-1 ) {
            logoId = '-doctor';
        }
        if (el.key.indexOf('lemuria')>-1 ) {
            logoId = '-halsokost';
        }
        if (el.key.indexOf('flora')>-1 ) {
            logoId = '-flora';
        }
        if (el.key.indexOf('reggev')>-1 ) {
            logoId = '-reggev';
        }
        if (el.key.indexOf('manna')>-1 ) {
            logoId = '-manna';
        }
        if (el.key.indexOf('sono')>-1 ) {
            logoId = '-sono';
        }
        if (el.key.indexOf('raw')>-1 ) {
            logoId = '-raw';
        }
        return 'img/logos/logo'+logoId+'.png';
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
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());