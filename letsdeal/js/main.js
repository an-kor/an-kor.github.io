
T = {
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
    p: function(v, abs){
        if (abs) {
            return Math.abs(this.scale*v);
        }
        return this.scale*v;
    },
    setW: function (el, v){
        T.byId(el).style.width = v + 'px';
    },
    setH: function (el, v){
        T.byId(el).style.height = v + 'px';
    },
    updateStyle: function(selector, obj, value){
        var css = document.styleSheets[1];
        for (var i in css.rules) {
            if (css.rules[i].selectorText && css.rules[i].selectorText == selector){
                if (typeof(value) != 'undefined') {
                    css.rules[i].style[obj] = value;
                } else {
                    for (var key in obj) {
                        css.rules[i].style[key] = obj[key];
                    }
                }
                break;
            }
        }
    }
};
Styles = {
    defaultFontSize: 24,
    footer: {
        bgColor: '#3eacc8',
        borderTop: '1px solid #55bfda',
        fontSize: 20,
        height: 105
    },
    topMenu: {
        bgColor: '#3eacc8',
        borderBottom: '2px solid #d5d3cf',
        height: 85,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    numberOfPages: 6
};

App = {
    isDealsLoading: 0,
    getDeal: function(imgSrc){
        var dealTitles = ['83% på 4 nr av Sköna Hem inkl. produkter', '52% på töjbara halkskydd med rejäla ståldubbar', '70% på 6 showbiljetter till Julgalan 2013 i Västerås', '50% på biljett till Christer Sjögren Julkonsert 2013', '55% på klassisk korksandal med skön passform']
        return '<li><div class="deallist-item" style="background-image: url('+imgSrc+');"><div>' +
            '<div class="deallist-item-header">'+dealTitles[Math.floor(Math.random()*5)]+'</div>' +
                '<div class="deallist-item-footer">' +
                '<div class="deallist-item-footer-bought">108 köpta</div>' +
                '<div class="deallist-item-footer-price"><div class="deallist-item-footer-price-old">499 kr</div><div class="deallist-item-footer-price-new">229 kr</div></div>' +
                '</div>' +
            '</div></div></li>';
    },
    goToPage: function(i){
        setTimeout(function(){
            App.mainPageHScroll.goToPage(i, 0, 700, IScroll.ease.quadratic2);
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
        T.setH('footer', T.p(Styles.footer.height, 1));

        T.updateStyle('#footer-tabs', {
            background: Styles.footer.bgColor,
            borderTop: Styles.footer.borderTop
        });

        T.updateStyle('#footer-tabs a', {
            paddingTop: T.p(Styles.footer.height - 2*Styles.footer.fontSize) + 'px',
            fontSize: T.p(Styles.footer.fontSize) + 'px'
        });

        T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));

        T.setH('main-page-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
        T.updateStyle('#main-page-scroller', {
            top: T.p(Styles.topMenu.height) + 'px',
            width: T.w()*Styles.numberOfPages + 'px'
        });
        T.updateStyle('#main-page-scroller-list', {
            backgroundSize: '1px ' + T.p(64) + 'px'
        });
        T.updateStyle('#main-page-scroller-list > li', 'width', T.w() + 'px');

        T.updateStyle('#top-menu-background', {
            height: T.p(Styles.topMenu.height) + 'px',
            background: Styles.topMenu.bgColor
        });
        T.updateStyle('#top-menu-wrapper', {
            width: T.w() + 'px',
            borderBottom: Styles.topMenu.borderBottom
        });

        T.updateStyle('#top-menu-wrapper ul', {
            width: T.w()*Styles.numberOfPages + 'px',
            paddingLeft: (T.w() - (T.w()/2.5))/2 + 'px'
        });

        T.updateStyle('#top-menu-wrapper li', {
            width: T.w()/2.5 + 'px',
            height: T.p(Styles.topMenu.height) + 'px',
            background: Styles.topMenu.bgColor,
            fontSize: T.p(Styles.topMenu.fontSize) + 'px',
            fontWeight: Styles.topMenu.fontWeight
        });

        T.updateStyle('#top-menu-wrapper li a', {
            lineHeight: T.p(Styles.topMenu.height) + 'px',
            color: Styles.topMenu.color
        });

      /*  T.updateStyle('.deallist > ul li', {
            height: T.p(400) + 'px'
        });*/

        var k = T.p(350) / 290, wk = k, itemWidth = 510, scrollWidth = 0;
        if (T.isDesktop) {
            scrollWidth = 8
        }
        if ((T.w() > 600 && !T.isAndroid) || (Math.abs(window.orientation) == 90)) {
                k = (T.w()/2 - T.p(22, 1)) / itemWidth;
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
            background: 'rgba(0,0,0,0.4)',
            height: T.p(50)+'px',
            paddingLeft: T.p(15)+'px',
            lineHeight: T.p(50)+'px',
            color: 'white',
            fontSize: T.p(24)+'px'
            //,textShadow: (!T.isAndroid2)?'0px 1px 2px rgba(0, 0, 0, 0.5)':''
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

        T.byId('pages-wrapper').style.bottom = T.p(Styles.footer.height) + 'px';
        T.setW('pages-scroller', T.w()*2);

        App.mainPageHScroll = new IScroll(T.byId('main-page-wrapper'), {
            scrollX: true,
            scrollY: 0,
            snap: true,
            momentum: false,
            snapThreshold: 0.1,
            lockDirection: true,
            directionLockThreshold: 20,
            eventPassthrough: 'vertical',
            preventDefault: true,
            indicators: [{
                el: T.byId('top-menu-wrapper'),
                resize: 0,
                ignoreBoundaries: true,
                speedRatioX: 0.4,
                listenY: false
            }]
        });

        App.mainPageHScroll.on('translate', function(){
            document.querySelector('#top-menu-wrapper li.active').className = '';
            document.querySelector('#top-menu-wrapper li:nth-child('+(this.currentPage.pageX+1)+')').className = 'active';
        });
        var i = 1, scrollers = [];
        while (i<Styles.numberOfPages+1) {
            var el = T.byId('deallist'+i);
            var dealsText = '';
            for (var i2 = 0; i2<(i>1?8:24); i2++) {
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
                scrollers[i] = new IScroll(T.byId('wrapper'+i), scrollerOptions);
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
            } else {
                T.byId('wrapper'+i).index = i;
                T.byId('wrapper'+i).addEventListener("scroll",function(e){
                    if(!App.isDealsLoading && (e.target.scrollTop > e.target.scrollHeight - T.h()*1.3)) {
                        // MBP.hideUrlBar();
                        var self = this;
                        var el = T.byId('deallist'+e.target.index);
                        App.isDealsLoading = 1;

                        var loadingElement = document.createElement("div");
                        loadingElement.className = 'loading-icon';
                        el.appendChild(loadingElement);
                        dealsText = '';
                        for (var i2 = 0; i2<20; i2++) {
                            dealsText += App.getDeal(Deals[Math.floor(Math.random()*1000)])
                        }
                        var dealsElement = document.createElement("div");
                        dealsElement.innerHTML = dealsText;
                        setTimeout(function(){
                            el.removeChild(loadingElement);
                            el.appendChild(dealsElement);
                            App.isDealsLoading = 0
                        }, 1500)
                    }
                }, 1);
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
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);