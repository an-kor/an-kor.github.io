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
        if (T.isAndroid && !T.isChrome) {
            var height = screen.availHeight;
            if (Math.abs(window.orientation) == 90) {
                height = screen.availWidth;
            }
            if (window.innerHeight>(height*0.6)) {
                return window.innerHeight
            } else {
                return height-window.screenTop
            }
        } else {
            return window.innerHeight;
        }
    },
    p: function(v, abs){
        if (abs) {
            return Math.abs(this.scale*v);
        }
        return parseFloat((this.scale*v).toFixed(3));
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
        T.xhrReq({
            url: url,
            dataType: 'text',
            type: 'GET',
            timeout: timeout,
            data: params,
            success: function(data){
                //try {
                    callback(JSON.parse(data));
               // } catch(e) {
               //     console.log('error on parsing data', data)
               // }
            },
            error: function(data){
                errorCallback(data);
            }
        })
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
                if (xhr.status < 300) {
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

var Styles = {
    defaultFontSize: 24,
    footer: {
        bgColor: '#3eacc8',
        borderTop: '1px solid #55bfda',
        fontSize: 20,
        height: 105
    },
    topMenu: {
        bgColor: '#3eacc8',
        borderBottom: '2px solid #e1e1e1',
        height: 85,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    numberOfPages: 0,
    numberOfImages: 12
};
var Deals = {
    addNewList: function(data, index){
        if (typeof(index)=='undefined'){
            index = Styles.numberOfPages;
        }
        var pageTpl = Templates.dealsPage(data.id);
        var previousPage = T.query('#main-page-scroller-list > li:nth-child('+(index)+')');
        var newPage = document.createElement("li");
        newPage.innerHTML = pageTpl;

        var wrapper = newPage.firstChild;
        wrapper.index = data.id;
        if (T.isIOS) {
            wrapper.scrollTop = 1
        }
        wrapper.addEventListener("scroll",function(e){
            if (T.isIOS) {
                if (e.target.scrollTop == 0) {
                    e.target.scrollTop = 1
                }
            }

            if(!App.isDealsLoading && (e.target.scrollTop > e.target.scrollHeight - T.h()*1.3)) {
                var self = this;
                var el = T.byId('deallist_'+e.target.index);
                App.isDealsLoading = 1;

                var loadingElement = document.createElement("div");
                loadingElement.className = 'loading-icon';

                el.appendChild(loadingElement);
                var dealItems = T.query('#deallist_'+e.target.index + ' .deallist-item');
                Deals.loadDeals(data.id, dealItems.length, 10, function(dealsElement){
                    if (T.isIOS) {
                        var transitionTime = 0.8;
                        dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                        dealsElement.style.opacity = 0;
                    }

                    el.removeChild(loadingElement);
                    el.appendChild(dealsElement);
                    setTimeout(function(){
                        if (T.isIOS) {
                            dealsElement.style.opacity = 1;
                        }
                        App.isDealsLoading = 0;
                    }, 200);
                });
            }
        });

        if (previousPage.length === 0) {
            T.byId('main-page-scroller-list').appendChild(newPage);
        } else {
            previousPage.parentNode.insertBefore(newPage, previousPage.nextSibling);
        }
        var headerTpl = Templates.dealsPageHeader(data);

        var previousHeader = T.query('#top-menu-tabs > li:nth-child('+(index)+')');
        var newHeader = document.createElement("li");
        newHeader.innerHTML = headerTpl;
        if (previousHeader.length === 0) {
            T.byId('top-menu-tabs').appendChild(newHeader);
        } else {
            previousHeader.parentNode.insertBefore(newHeader, previousHeader.nextSibling);
        }
        newHeader.firstChild.addEventListener('click', function(e){
            var childs = this.parentNode.parentNode.childNodes;
            for (var i in childs) {
                if (childs[i].nodeName == 'LI' && childs[i].firstChild.id == this.id) {
                    return App.goToPage(i-1);
                }
            }
        });

        Deals.loadDeals(data.id, 0, 10, function(result){
            T.byId('deallist_'+data.id).appendChild(result)
        });
        Styles.numberOfPages++;
    },
    loadDeals: function(type, from, limit, callback){
        var dealsText = '';
        T.request('deals', function(data){
            for (var i in data) {
                dealsText += Templates.dealsItem(data[i]);
            }
            var dealsElement = document.createElement("div");
            dealsElement.innerHTML = dealsText;
            callback(dealsElement);
        }, {
            type: type,
            from: from,
            limit: limit
        });
    }
};
var Templates = {
    dealsPage: function(pageId){
        return '<div class="main-v-wrapper" id="wrapper_'+pageId+'">'+
                   '<div class="deallist">'+
                       '<ul id="deallist_'+pageId+'">'+
                       '</ul>'+
                   '</div>'+
               '</div>';
    },
    dealsItem: function(data){
        return '<li><div class="deallist-item" style="background-image: url('+data.imageSrc+');"><div>' +
            '<div class="deallist-item-header">'+data.title+'</div>' +
                '<div class="deallist-item-footer">' +
                '<div class="deallist-item-footer-bought">'+data.bulk+' köpta</div>' +
                '<div class="deallist-item-footer-price"><div class="deallist-item-footer-price-old">'+data.origPrice+' kr</div><div class="deallist-item-footer-price-new">'+data.price+' kr</div></div>' +
                '</div>' +
            '</div></div></li>';
    },
    dealsPageHeader: function(data){
        return '<a href="javascript:void(0)" id="header_'+data.id+'">'+data.name+' <span class="top-menu-tabs-counter">('+data.dealsCount+')</span></a>';
    },
    prepareFooter: function(){
        T.setH('footer', T.p(Styles.footer.height, 1));
        T.updateStyle('#footer-tabs', {
            background: Styles.footer.bgColor,
            borderTop: Styles.footer.borderTop
        });
        T.updateStyle('#footer-tabs a', {
            paddingTop: T.p(Styles.footer.height - 2*Styles.footer.fontSize) + 'px',
            fontSize: T.p(Styles.footer.fontSize) + 'px',
            backgroundSize: T.p(48)+'px '+ T.p(48) +'px',
            backgroundPosition: '50% '+ T.p(12) +'px'
        });
    },
    prepareHeader: function(){
        if (T.p(Styles.topMenu.fontSize)>T.w()/17) {
            Styles.topMenu.fontSize = T.w()/T.p(17.5);
            Styles.topMenu.height = Styles.topMenu.fontSize*2;
        }

        T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));

        T.updateStyle('#top-menu-background', {
            height: T.p(Styles.topMenu.height) + 'px',
            background: Styles.topMenu.bgColor,
            borderBottom: Styles.topMenu.borderBottom
        });

        var trHeight = Math.ceil(T.p(Styles.topMenu.height)/5.66);
        T.updateStyle('#top-menu-triangle', {
            height: trHeight + 'px',
            top: T.p(Styles.topMenu.height) - trHeight + 'px'
        });

        T.updateStyle('#top-menu-wrapper', {
            width: T.w() + 'px'
        });

        T.updateStyle('#top-menu-wrapper ul', {
            width: T.w()*Styles.numberOfPages + 'px',
            paddingLeft: (T.w() - (T.w()/2))/2 + 'px'
        });

        T.updateStyle('#top-menu-wrapper li', {
            width: T.w()/2 + 'px',
            height: T.p(Styles.topMenu.height)-2 + 'px',
            background: Styles.topMenu.bgColor,
            fontSize: T.p(Styles.topMenu.fontSize) + 'px',
            fontWeight: Styles.topMenu.fontWeight
        });

        T.updateStyle('#top-menu-wrapper li a', {
            lineHeight: T.p(Styles.topMenu.height) + 'px',
            color: Styles.topMenu.color
        });
        T.query('#top-menu-wrapper li:nth-child(1)').className = 'top-menu-tabs-active';
    },
    prepareMainPage: function(){
        T.setH('main-page-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
        T.updateStyle('#main-page-scroller', {
            top: T.p(Styles.topMenu.height) + 'px',
            width: T.w()*Styles.numberOfPages + 'px'
        });
        T.updateStyle('#main-page-scroller-background', {
            backgroundSize: '1px ' + T.p(65) + 'px',
            height: T.p(64) + 'px',
            top: T.h() - T.p(Styles.footer.height+146) + 'px'
        });
        T.updateStyle('#main-page-scroller-list', {
            backgroundSize: '1px ' + T.p(64) + 'px'
        });
        T.updateStyle('#main-page-scroller-list > li', 'width', T.w() + 'px');
        App.mainPageHScroll = new IScroll(T.byId('main-page-wrapper'), {
            scrollX: true,
            scrollY: 0,
            snap: true,
            momentum: false,
            bounce: false,
            snapThreshold: 0.1,
            lockDirection: true,
            directionLockThreshold: 20,
            eventPassthrough: 'vertical',
            preventDefault: true,
            indicators: [{
                el: T.byId('top-menu-wrapper'),
                resize: 0,
                ignoreBoundaries: true,
                speedRatioX: 0.5,
                listenY: false
            }]
        });
        App.mainPageHScroll.on('translate', function(){
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child('+(this.currentPage.pageX+1)+')').className = 'top-menu-tabs-active';
        });
    },
    prepareDeals: function(){
        var k = T.p(350) / 290, wk = k, itemWidth = 510, scrollWidth = 0;
        if (T.isDesktop) {
            scrollWidth = 8
        }
        if ((T.w() > 600 && !T.isAndroid) || (Math.abs(window.orientation) == 90)) {
            k = (T.w()/2 - T.p(21.5)) / itemWidth;
            if (wk < k) {
                wk = k;
            }
        } else {
            if (k * itemWidth < (T.w() - T.p(30))) {
                k = (T.w() - T.p(30)) / itemWidth;
                wk = k;
            } else {
                k = (T.w() - T.p(30)) / itemWidth;
            }
        }
        T.updateStyle('.deallist-item', {
            margin: T.p(10) + 'px 0 0 ' + T.p(15, 1) + 'px',
            height: T.p(400) + 'px',
            width: (k * itemWidth) - scrollWidth + 'px',
            border: '1px solid white',
            boxShadow: '0px 0px 0px 1px rgba(204,202,197,1)',
            borderRadius: (!T.isAndroid2)? T.p(4)+'px':'',
            webkitBackgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundPosition: '0px ' + (T.p(340) - wk * 290) + 'px'
        });

        T.updateStyle('.deallist-item-header', {
            background: 'rgba(0,0,0,0.6)',
            height: T.p(50)+'px',
            paddingLeft: T.p(15)+'px',
            lineHeight: T.p(50)+'px',
            color: 'white',
            fontSize: T.p(24)+'px'
            ,textShadow: (!T.isAndroid2)?'0px 1px 2px rgba(0, 0, 0, 0.5)':''
        });
        T.updateStyle('.deallist-item-footer', {
            marginTop: T.p(290) +'px',
            borderTop: 1+'px solid #cccac5',
            height: T.p(60) - 2 +'px'
        });
        T.updateStyle('.deallist-item-footer-bought', {
            width: T.p(130) + 'px',
            background: '#edebe6',
            fontWeight: 'bold',
            color: '#545351',
            textAlign: 'center',
            fontSize: T.p(21)+'px'
            ,lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price', {
            width: (k * 510) - T.p(140) + 'px',
            lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price-new', {
            color: '#d72e1e',
            fontWeight: 'bold',
            margin: '0 ' + T.p(10)+'px',
            fontSize: T.p(38)+'px'
            ,lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price-old', {
            color: '#8f8f8f',
            fontSize: T.p(24)+'px',
            textDecoration: 'line-through'
        });
        T.updateStyle('.deallist > ul', {
            paddingBottom: T.p(80)+'px'
        });
        T.updateStyle('.loading-icon', {
            height: T.p(80)+'px',
            webkitBackgroundSize: T.p(48) + 'px ' + T.p(48) + 'px',
            backgroundSize: T.p(48) + 'px ' + T.p(48) + 'px'
        });
    }
};
var App = {
    isDealsLoading: 0,
    goToPage: function(i){
        i=parseInt(i);
        setTimeout(function(){
            App.mainPageHScroll.goToPage(i, 0, 700, IScroll.ease.quadratic2);
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child('+(i+1)+')').className = 'top-menu-tabs-active';
        },100)
    },
    init: function(){
        FastClick.attach(document.body);
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / 1136;
        } else {
            T.scale = T.h() / 640;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';

        T.byId('pages-wrapper').style.bottom = T.p(Styles.footer.height) + 'px';
        T.setW('pages-scroller', T.w()*2);

        T.request('categories', function(data){
            var i;
            for (i in data.categories) {
                Deals.addNewList(data.categories[i]);
            }
            for (i in data.cities) {
                if (data.cities[i].id == 'stockholm') {
                    Deals.addNewList(data.cities[i], 1);
                }
            }
            Templates.prepareHeader();
            Templates.prepareMainPage();
            Templates.prepareDeals();
            Templates.prepareFooter();
            T.byId('container').style.opacity=1;
        });
        return 0;
        var i = 1, scrollers = [];
        while (i<Styles.numberOfPages+1) {
            var el = T.byId('deallist'+i);
            var dealsText = '';
            for (var i2 = 0; i2<(i>1?8:12); i2++) {
                dealsText += App.getDeal(Deals[Math.ceil(Math.random()*1000)])
            }

            var dealsElement = document.createElement("div");
            dealsElement.innerHTML = dealsText;
            el.appendChild(dealsElement);

            if (T.isAndroid2) {
                var scrollerOptions = {
                    index: i,
                    startX: 0,
                    startY: 0,
                    scrollX: false,
                    scrollY: true,
                    scrollbars: true,
                    lockDirection: true
                };
                /* var scrollerOptions = {
                 index: i,
                 startX: 0,
                 startY: 0,
                 scrollX: false,
                 scrollY: true,
                 scrollbars: true,
                 lockDirection: true
                 //,useTransition: (T.isAndroid2?0:0)
                 };
                 if (!T.isAndroid2 && T.isAndroid && !T.isChrome) {
                 scrollerOptions.deceleration = 0.001;
                 scrollerOptions.speedRatio = 0.4;
                 scrollerOptions.maxMomentumDistance = T.h()*1.5;
                 scrollerOptions.maxMomentumDuration = T.h()*4;
                 }
                 if (T.isAndroid && T.isChrome) {
                 scrollerOptions.deceleration = 0.0006;
                 scrollerOptions.speedRatio = 0.8;
                 scrollerOptions.maxMomentumDistance = T.h()*3;
                 scrollerOptions.maxMomentumDuration = T.h()*6;
                 }*/
                /*
                scrollers[i].on('scrollEnd', function(e){
                    var self = this;
                    var el = T.byId('deallist'+self.options.index), cnt = 0;
                    if (!App.checkLoadInterval) {
                        App.checkLoadInterval = setInterval(function(){
                            cnt++;
                            if(!self.isInTransition || cnt>1) {
                                if (el.innerHTML.indexOf('new_url')>0){
                                    el.innerHTML = el.innerHTML.replace(/new_url/g, 'url');
                                }
                                clearInterval(App.checkLoadInterval);
                                App.checkLoadInterval = 0;
                                setTimeout(function(){
                                    App.isDealsLoading = 0;
                                    cnt = 0;
                                }, 700);
                            }
                        }, 2000);
                    }
                });
                */
                scrollers[i] = new IScroll(T.byId('wrapper'+i), scrollerOptions);
                scrollers[i].on('translate', function(){
                    try{
                        if(!App.isDealsLoading && Math.abs(this.y) > Math.abs(this.maxScrollY)) {
                            // MBP.hideUrlBar();
                            var self = this;
                            var el = T.byId('deallist'+this.options.index);
                            App.isDealsLoading = 1;

                            var loadingElement = document.createElement("div");
                            loadingElement.className = 'loading-icon';
                            el.appendChild(loadingElement);
                            dealsText = '';
                            for (var i2 = 0; i2<10; i2++) {
                                dealsText += App.getDeal(Deals[Math.floor(Math.random()*1000)])
                            }
                            var dealsElement = document.createElement("div");
                            dealsElement.innerHTML = dealsText;
                            setTimeout(function(){
                                el.removeChild(loadingElement);
                                el.appendChild(dealsElement);
                                self.refresh();
                                App.isDealsLoading = 0
                            }, 1500)
                        }
                    } catch(e){}
                });
            }
            i++;
        }
        App.pagesScroll = new IScroll(T.byId('pages-wrapper'), {
            scrollX: true,
            scrollY: 0
        });
        App.pagesScroll.disable();
    }
};
T.setH('container', T.h());
//MBP.hideUrlBarOnLoad();
window.addEventListener('load', function() {
    App.init();
});
window.addEventListener("orientationchange", function() {
    setTimeout(function(){
        location.reload();
    }, 100)
}, false);
document.addEventListener('touchmove', function (e) {
    if (T.isIOS && e.changedTouches.length) {
        if (e.changedTouches[0].screenY < T.p(Styles.topMenu.height) || e.changedTouches[0].screenY > T.h() - T.p(Styles.footer.height)) {
            e.preventDefault();
        }
    }
}, false);