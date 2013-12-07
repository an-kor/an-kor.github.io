var App = {
    pagesNumber: 1,
    isDealsLoading: 0,
    inTransition: 0,
    changeHScrollerPage: function(i){
        i=parseInt(i);
        setTimeout(function(){
            App.mainPageHScroll.goToPage(i, 0, Styles.transitionTime, IScroll.ease.quadratic2);
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child('+(i+1)+')').className = 'top-menu-tabs-active';
        },100)
    },
    addPage: function(dealId){
        if (!App.inTransition && !App.mainPageHScroll.scrollActive){
            App.inTransition = 1;
            T.byId('pages-wrapper').style.display='block';
            if (App.pagesNumber>=5) {
                T.setW('pages-scroller', T.w()*(App.pagesNumber+1));
                App.pagesScroll.refresh();
            }
            var currentEl, newEl;
            currentEl = T.byId('pages-current');
            newEl = document.createElement("div");
            newEl.style.width = T.w()+'px';
            var template = T.byId('deal-page-template').innerHTML;
            var contentTemplate = T.byId('dealinfo-content-template').innerHTML;
            var bottomTemplate = T.byId('dealinfo-bottom-template').innerHTML;
            template = template.replace("%CONTENT%", contentTemplate);
            if (dealId) {
                var data = Deals.loadedDeals[dealId];
                template = template.replace("%TITLE%", data.title);
                template = template.replace("%IMAGESRC%", data.imageSrc);
                template = template.replace("%MAP_ID%", "dealinfo-map-"+data.id);
                template = template.replace("%SHORT_DESCRIPTION%", data.shortDescription);
                bottomTemplate = bottomTemplate.replace("%BULK%", T.formatNumber(data.bulk));
                bottomTemplate = bottomTemplate.replace("%OLDPRICE%", T.formatNumber(data.origPrice));
                bottomTemplate = bottomTemplate.replace("%NEWPRICE%", T.formatNumber(data.price));
            }
            clearInterval(App.countDownInterval);
            var countdown = parseInt(data.endtime);
            App.countDownInterval = setInterval(function(){
                var curTime = Math.floor(new Date().getTime() / 1000),
                    delta = countdown - curTime,
                    hours = Math.floor(delta/3600),
                    minutes = Math.floor((delta - (hours*3600))/60),
                    seconds = (delta - (hours*3600) - (minutes*60));
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                T.query('.dealinfo-bottom-countdown span')[0].innerHTML = hours+ ":" + minutes + ":" + seconds;
            }, 1000);
            newEl.innerHTML = template;
            currentEl.parentNode.appendChild(newEl);
            if (T.isIOS) {
                var wrapper = T.query('.dealinfo-wrapper')[0];
                wrapper.scrollTop = 1;
                wrapper.bottomReached = 0;
                wrapper.addEventListener("scroll",function(e){
                    if (!wrapper.bottomReached) {
                            if (wrapper.scrollTop == 0) {
                                wrapper.scrollTop = 1
                            }
                        if(wrapper.scrollTop > wrapper.scrollHeight - T.h()) {
                            wrapper.bottomReached = 1;
                            setTimeout(function(){
                                wrapper.bottomReached = 0;
                            },300)
                            wrapper.scrollTop = wrapper.scrollTop - 1;
                        }
                    }
                });
            }
            if (data.lat > 0) {
                var map = L.map("dealinfo-map-"+data.id).setView([data.lat, data.lon], 13);
                var marker = L.marker([data.lat, data.lon]).addTo(map);
                L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=x-local&src=app&x={x}&y={y}&z={z}&s=Ga', {
                    attribution: '',
                    maxZoom: 19
                }).addTo(map);
            } else {
                T.byId("dealinfo-map-"+data.id).style.display = 'none';
            }
            // var scroller = new IScroll(T.query('.dealinfo-wrapper')[0]);
            // setTimeout(function(){
            //    scroller.refresh();
            // },500);
            var bottomEl = document.createElement("div");
            bottomEl.innerHTML = bottomTemplate;
            newEl.appendChild(bottomEl);
            App.pagesScroll.scrollBy(-T.w(),0,Styles.transitionTime);
            App.pagesNumber++;
            setTimeout(function(){
                App.inTransition = 0;
            }, Styles.transitionTime);
        }
    },
    goBack: function(){
        clearInterval(App.countDownInterval);
        App.pagesScroll.scrollBy(T.w(),0,Styles.transitionTime);
        setTimeout(function(){
            var currentEl;
            currentEl = T.byId('pages-current');
            currentEl.parentNode.removeChild(currentEl.parentNode.lastChild);
            App.pagesNumber--;
        },Styles.transitionTime);
    },
    init: function(){
        FastClick.attach(document.body);
        if (!window.orientation || window.orientation == 180) {
            T.scale = T.h() / 1136;
        } else {
            T.scale = T.h() / 640;
        }
        document.body.style['font-size'] = T.p(Styles.defaultFontSize) + 'px';
        T.setH('container', T.h());
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
            Templates.preparePages();
            Templates.prepareHeader();
            Templates.prepareHScroller();
            Templates.prepareDeals();
            Templates.prepareDealInfo();
            Templates.prepareFooter();
            setTimeout(function(){
                T.byId('container').style.opacity=1;
                T.byId('splash').style.display = 'none';
            },200);
        }, null, function(){
            T.byId('splash-loading').style.display = 'none';
            T.byId('splash-message').innerHTML = Messages.connectionError
        });
        return 0;
    }
};
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