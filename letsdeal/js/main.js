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
        Templates.prepareSplash();

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
            setTimeout(function(){
                T.byId('container').style.opacity=1;
                T.byId('splash').style.display = 'none';
            },200);
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