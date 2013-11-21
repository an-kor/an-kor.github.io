
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
        return this.scale*v;
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
        borderBottom: '2px solid #e1e1e1',
        height: 85,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    numberOfPages: 3,
    numberOfImages: 24
};

App = {
    currentPage:0,
    pages: [{},{},{}],
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
    goToPage: function(pageId){
        var i = 1;
        while (i<Styles.numberOfPages+1) {
            T.byId('top-menu-tabs').style.webkitTransform='translateX(-'+(T.w()/2)*pageId+'px)';
            T.byId('wrapper'+i).style.webkitTransform='translateX(-'+T.w()*pageId+'px)';
            i++;
        }
        document.querySelector('#top-menu-wrapper li.top-menu-tabs-active').className = '';
        document.querySelector('#top-menu-wrapper li:nth-child('+(pageId+1)+')').className = 'top-menu-tabs-active';
       // T.byId('wrapper'+(App.currentPage+1)).style.display = 'none';
       // T.byId('wrapper'+(pageId+1)).style.display = 'block';
        App.currentPage = pageId;
        window.scrollTo(0, App.pages[pageId].scroll);
    },
    init: function(){
        FastClick.attach(document.body);

        Hammer(window).on("swiperight", function(e) {
            if(App.currentPage>0) {
                App.goToPage(App.currentPage - 1)
            }
            e.preventDefault();
        });

        Hammer(window).on("swipeleft", function() {
            if(App.currentPage<Styles.numberOfPages-1) {
                App.goToPage(App.currentPage + 1)
            }
            e.preventDefault();
        });

        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / 1136;
        } else {
            T.scale = T.h() / 640;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';

        T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));
        T.updateStyle('#top-menu-wrapper', {
            width: T.w() + 'px',
            background: Styles.topMenu.bgColor
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


        T.setH('footer', T.p(Styles.footer.height, 1));
        if (T.p(Styles.topMenu.fontSize)>T.w()/17) {
            Styles.topMenu.fontSize = T.w()/T.p(17.5);
            Styles.topMenu.height = Styles.topMenu.fontSize*2;
        }

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
            paddingTop: T.p(Styles.topMenu.height)+'px',
            paddingBottom: T.p(Styles.footer.height)+T.p(100)+'px'
        });
        T.updateStyle('.loading-icon', {
            height: T.p(80)+'px',
            webkitBackgroundSize: T.p(48) + 'px ' + T.p(48) + 'px',
            backgroundSize: T.p(48) + 'px ' + T.p(48) + 'px'
        });

        window.addEventListener("scroll",function(e){
            App.pages[App.currentPage].scroll = window.scrollY;

            setTimeout(function(){
            if(!App.isDealsLoading && (window.scrollY > document.body.scrollHeight - T.h()*1.3)) {
                // MBP.hideUrlBar();
                var el = T.byId('deallist'+(App.currentPage+1));
                App.isDealsLoading = 1;

                var loadingElement = document.createElement("div");
                loadingElement.className = 'loading-icon';

                // loadingElement.style.transition = 'opacity 0.5s';
                //  loadingElement.style.webkitTransition = 'opacity 0.5s';
                //  loadingElement.style.opacity = 1;

                el.appendChild(loadingElement);
                dealsText = '';
                for (var i2 = 0; i2<16; i2++) {
                    dealsText += App.getDeal(Deals[Math.floor(Math.random()*1000)])
                }
                var dealsElement = document.createElement("div");
                dealsElement.innerHTML = dealsText;
                var transitionTime = 0.25;
                if (T.isIOS) {
                    transitionTime = 0.8;
                    dealsElement.style.transition = 'opacity '+transitionTime+'s';
                    dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                    dealsElement.style.opacity = 0;
                    dealsElement.style.webkitBackfaceVisibility = 'hidden';
                }

                setTimeout(function(){
                    //    loadingElement.style.opacity = 0;
                    el.removeChild(loadingElement);
                    el.appendChild(dealsElement);
                    setTimeout(function(){
                        if (T.isIOS) {
                            dealsElement.style.opacity = 1;
                        }
                        App.isDealsLoading = 0;
                    }, 300);
                }, 300)
            }
            }, 300)
        }, false);


        var i = 1, scrollers = [];
        while (i<Styles.numberOfPages+1) {
            var el = T.byId('deallist'+i);
            var dealsText = '';
            for (var i2 = 0; i2<Styles.numberOfImages; i2++) {
                dealsText += App.getDeal(Deals[Math.ceil(Math.random()*1000)])
            }

            var dealsElement = document.createElement("div");
            dealsElement.innerHTML = dealsText;
            el.appendChild(dealsElement);

/* var wrapper = T.byId('wrapper'+i);
            wrapper.index = i;

            if (T.isIOS) {
                wrapper.scrollTop = 1
            }
            wrapper.addEventListener("scroll",function(e){
                return false;
                if (T.isIOS) {
                    if (e.target.scrollTop == 0) {
                        e.target.scrollTop = 1
                    }
                }
                //for (var i2 = 1; i2<7; i2++) {
                //    document.querySelector('#deallist1 li:nth-child('+(Math.floor(e.target.scrollTop/T.h()*0.5)*6+i2)+')').style.opacity = 1;
                //}
                if(!App.isDealsLoading && (e.target.scrollTop > e.target.scrollHeight - T.h()*1.3)) {
                    // MBP.hideUrlBar();
                    var self = this;
                    var el = T.byId('deallist'+e.target.index);
                    App.isDealsLoading = 1;

                    var loadingElement = document.createElement("div");
                    loadingElement.className = 'loading-icon';

                   // loadingElement.style.transition = 'opacity 0.5s';
                  //  loadingElement.style.webkitTransition = 'opacity 0.5s';
                  //  loadingElement.style.opacity = 1;

                    el.appendChild(loadingElement);
                    dealsText = '';
                    for (var i2 = 0; i2<6; i2++) {
                        dealsText += App.getDeal(Deals[Math.floor(Math.random()*1000)])
                    }
                    var dealsElement = document.createElement("div");
                    dealsElement.innerHTML = dealsText;
                    var transitionTime = 0.25;
                    if (T.isIOS) {
                        transitionTime = 0.8;
                        dealsElement.style.transition = 'opacity '+transitionTime+'s';
                        dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                        dealsElement.style.opacity = 0;
                        dealsElement.style.webkitBackfaceVisibility = 'hidden';
                    }

                    setTimeout(function(){
                    //    loadingElement.style.opacity = 0;
                        el.removeChild(loadingElement);
                        el.appendChild(dealsElement);
                        setTimeout(function(){
                            if (T.isIOS) {
                                dealsElement.style.opacity = 1;
                            }
                            App.isDealsLoading = 0;
                        }, 200)
                    }, 300)
                }
            }, 1);
*/
            i++;
        }
    }
};
MBP.hideUrlBarOnLoad();
window.addEventListener('load', function() {
    App.init();
});
/*
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
}, false);*/