var T = {
    isIOS: /iP(ad|hone|od)/.test(navigator.userAgent),
    isWebkit: /WebKit/.test(navigator.userAgent),
    isDesktop: !("ontouchstart" in document.documentElement),
    isChrome: /Chrome/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    isAndroid2: /Android 2/.test(navigator.userAgent),
    scale: 1,
    byId: function (id){
        return document.getElementById(id);
    },
    remove: function(id) {
        var el = T.byId(id);
        el.parentElement.removeChild(el);
    },
    query: function (query){
        var result = document.querySelectorAll(query);
        if (result.length == 1) {
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
            return window.innerHeight;
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
    request: function(action, callback, params, errorCallback, timeout) {
        var url = './controller.php';
        if (!timeout) {
            timeout = 8000;
        }
        if (!params) {
            params = {action: action}
        } else {
            params.action = action;
        }
        params.apikey = "a4Gsm";
        T.xhrReq({
            url: url,
            dataType: 'text',
            type: 'GET',
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
                errorCallback(data);
            }
        })
    },
    formatNumber: function(value){
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    initHover: function(elements, bgHoverColor, bgColor){
        if (!elements.length) {
            elements = [elements];
        }
        if (!bgColor) {
            bgColor = null;
        }
        for (var i=0;i<elements.length;i++) {
            elements[i].addEventListener('touchstart', function() {
                this.style.backgroundColor = bgHoverColor;
            });
            elements[i].addEventListener('touchend', function() {
                this.style.backgroundColor = bgColor;
            });
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
        o.type = "POST";
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
            url += "?ts=" + nocache;
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
