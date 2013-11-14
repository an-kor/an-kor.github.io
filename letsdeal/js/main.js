
T = {
    isIOS: /iP(ad|hone|od)/.test(navigator.userAgent),
    isWebkit: /WebKit/.test(navigator.userAgent),
    isChrome: /Chrome/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    scale: 1,
    byId: function (id){
        return document.getElementById(id);
    },
    query: function (query){
        return document.querySelector(query);
    },
    w: function (){
        return window.innerWidth;
    },
    h: function (){
        if (T.isAndroid) {
            return window.outerHeight;
        } else {
            return window.innerHeight;
        }
    },
    p: function(v){
        return this.scale*v;
    },
    setW: function (el, v){
        T.byId(el).style.width = v + 'px';
    },
    setH: function (el, v){
        T.byId(el).style.height = v + 'px';
    },
    updateStyle: function(selector, key, value){
        var css = document.styleSheets[1];
        for (var i in css.rules) {
            if (css.rules[i].selectorText && css.rules[i].selectorText == selector){
                css.rules[i].style[key] = value;
            }
        }
    }
};
Styles = {
    defaultFontSize: 30,
    topMenuHeight: 70,
    footerTabsHeight: 120,
    numberOfPages: 3
};

App = {
    init: function(){
        FastClick.attach(document.body);
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / 960;
        } else {
            T.scale = T.h() / 640;
        }
        T.setH('footer', T.p(Styles.footerTabsHeight));
        T.updateStyle('#footer-tabs a', 'line-height', T.p(Styles.footerTabsHeight) + 'px');

        T.setH('top-menu-wrapper', T.p(Styles.topMenuHeight));


        T.byId('top-menu-tabs').style.padding = T.p(110) * 'px';

        T.setW('top-menu-wrapper', T.w());

        T.setH('main-page-wrapper', T.h() - T.p(Styles.footerTabsHeight));
        T.updateStyle('#main-page-scroller', 'top', T.p(Styles.topMenuHeight) + 'px');
        T.updateStyle('#main-page-scroller', 'width', T.w()*Styles.numberOfPages + 'px');
        T.updateStyle('#main-page-scroller-list > li', 'width', T.w() + 'px');

        T.updateStyle('#top-menu-wrapper ul', 'width', T.w()*Styles.numberOfPages + 'px');
        T.updateStyle('#top-menu-wrapper ul', 'padding-left', (T.w() - (T.w()/2.5))/2 + 'px');
        T.updateStyle('#top-menu-wrapper li', 'width', T.w()/2.5 + 'px');
        T.updateStyle('#top-menu-wrapper li', 'height', T.p(Styles.topMenuHeight) + 'px');
        T.updateStyle('#top-menu-wrapper li a', 'line-height', T.p(Styles.topMenuHeight) + 'px');

        T.updateStyle('.main-v-scroller > ul > li', 'height', T.p(100) + 'px');
        T.updateStyle('.main-v-scroller > ul > li', 'line-height', T.p(100) + 'px');

        T.byId('pages-wrapper').style.bottom = T.p(Styles.footerTabsHeight) + 'px';
        T.setW('pages-scroller', T.w()*2);
        document.body.style['font-size'] = T.p(30) + 'px';

        App.mainPageHScroll = new IScroll(T.byId('main-page-wrapper'), {
            scrollX: true,
            scrollY: 0,
            snap: true,
            momentum: false,
            snapThreshold: 0.1,
            lockDirection: true,
            directionLockThreshold: 20,
            eventPassthrough: 'vertical',
            indicators: [{
                el: T.byId('top-menu-wrapper'),
                resize: 0,
                ignoreBoundaries: true,
                speedRatioX: 0.4,
                listenY: false
            }]
        });
        var i = 1;
        while (i<4) {
            new IScroll(T.byId('wrapper'+i), {
                startX: 0,
                startY: 0,
                scrollX: false,
                scrollY: true,
                lockDirection: true
            });
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
MBP.hideUrlBarOnLoad();
window.addEventListener('load', function() {
    App.init();
});
window.addEventListener("orientationchange", function() {
    setTimeout(function(){
        location.reload();
    }, 100)
}, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);