var App = {
    pagesNumber: 1,
    isDealsLoading: 0,
    inTransition: 0,
    changeHScrollerPage: function (i) {
        i = parseInt(i);
        setTimeout(function () {
            App.mainPageHScroll.goToPage(i, 0, Styles.transitionTime, IScroll.ease.quadratic2);
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child(' + (i + 1) + ')').className = 'top-menu-tabs-active';
        }, 100)
    },
    sharePage: function (dealId) {
        var template = T.byId('dealinfo-share-template').innerHTML;
        template = template.replace('%TITLE_MSG%', Messages.shareWithFriends);
        template = template.replace('%CANCEL_MSG%', Messages.cancel);
        T.byId('page-on-top').innerHTML = template;
        T.query('.dealinfo-share-block')[0].style.marginTop = T.h() - 5.5 * T.p(80) + 'px';
        T.byId('page-on-top').style.display = 'block';
        if (T.isIOS) {
            T.byId('page-on-top').style.webkitTransition = 'opacity 1.5s';
            setTimeout(function(){
                T.updateStyle('#pages-new', {
                    webkitFilter: 'blur('+ T.px(5)+')'
                });
            }, 5);
        }
        setTimeout(function(){
            T.byId('page-on-top').style.opacity = 1;
        }, 0);
    },
    hideSharePage: function () {
        T.byId('page-on-top').style.opacity = 0;
        T.byId('page-on-top').style.display = 'none';
        if (T.isIOS) {
            T.byId('page-on-top').style.webkitTransition = null;
            T.updateStyle('#pages-new', {
                    webkitFilter: null
            });
        }
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
            newEl.id = "pages-new";
            newEl.style.width = T.w()+'px';
            var template = T.byId('deal-page-template').innerHTML;
            /*if (T.isIOS) {
                template = template.replace(/%IF_IOS:/g, "");
                template = template.replace(/%/g, "");
            } else {
                template = template.replace(/%IF_IOS:(.*)%/g, "");
            }*/

            var contentTemplate = T.byId('dealinfo-content-template').innerHTML;
            var bottomTemplate = T.byId('dealinfo-bottom-template').innerHTML;
            template = template.replace("%CONTENT%", contentTemplate);
            if (dealId) {
                var data = Deals.loadedDeals[dealId];
                template = template.replace("%TITLE%", data.title);
                template = template.replace("%IMAGESRC%", data.imageSrc);
                template = template.replace("%MAP_ID%", "dealinfo-map-"+data.id);
                template = template.replace("%SHORT_DESCRIPTION%", data.shortDescription);
                bottomTemplate = bottomTemplate.replace("%BULK%", T.formatNumber(data.bulk) + " " + Messages.bought);
                bottomTemplate = bottomTemplate.replace("%BUY_MSG%", Messages.buy);
                bottomTemplate = bottomTemplate.replace("%OLDPRICE%", T.formatNumber(data.origPrice)+" "+Messages.kr);
                bottomTemplate = bottomTemplate.replace("%NEWPRICE%", T.formatNumber(data.price)+" "+Messages.kr);
            }
            clearInterval(App.countDownInterval);
            var countdown = parseInt(data.endtime);
            App.countDownInterval = setInterval(function(){
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
                    T.query('.dealinfo-bottom-countdown')[0].innerHTML = hours +" "+ Messages.hours+", " + minutes +" "+ Messages.minutes+", " + seconds +" "+ Messages.seconds + " " + Messages.left;
                } else {
                    T.query('.dealinfo-bottom-countdown')[0].innerHTML = '';
                }
            }, 1000);
            newEl.innerHTML = template;
            currentEl.parentNode.appendChild(newEl);
            /*if (T.isIOS) {
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
            }*/

            /*if (data.lat > 0) {
                var map = L.map("dealinfo-map-"+data.id).setView([data.lat, data.lon], 13);
                var marker = L.marker([data.lat, data.lon]).addTo(map);
                L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=x-local&src=app&x={x}&y={y}&z={z}&s=Ga', {
                    attribution: '',
                    maxZoom: 19
                }).addTo(map);
            } else {
                T.byId("dealinfo-map-"+data.id).style.display = 'none';
            }
            */
            T.request('dealinfo', function(dealInfo){
                var el = T.query('.dealinfo-content-details')[0], template = el.innerHTML;
                template = template.replace("%ABOUT%", dealInfo.about);
                template = template.replace("%ABOUT_MSG%", Messages.about);
                template = template.replace("%HIGHLIGHTS%", dealInfo.highlights);
                template = template.replace("%HIGHLIGHTS_MSG%", Messages.highlights);
                template = template.replace("%TERMS%", dealInfo.terms);
                template = template.replace("%TERMS_MSG%", Messages.terms);
                template = template.replace("%CONTACTS%", dealInfo.contacts);
                el.innerHTML = template;
                el.style.display='block';
                if (data.lat > 0) {
                    var map = L.map("dealinfo-map-"+data.id).setView([data.lat, data.lon], 13);
                    var marker = L.marker([data.lat, data.lon]).addTo(map);
                    L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                        attribution: '',
                        maxZoom: 19
                    }).addTo(map);
                } else {
                    T.byId("dealinfo-map-"+data.id).style.display = 'none';
                }
                T.query('.dealinfo-content-loading')[0].style.display = 'none';
                if (T.isIOS) {
                    var scroller = new IScroll(T.query('.dealinfo-wrapper')[0], {
                        scrollbars: true,
                        hideScrollbarsOnMove:true
                    });
                    setTimeout(function(){
                        scroller.refresh();
                    },500);
                }
            }, {dealId: data.id}, function(){
                T.query('.dealinfo-content-loading')[0].style.display = 'none';
                var scroller = new IScroll(T.query('.dealinfo-wrapper')[0]);
                setTimeout(function(){
                    scroller.refresh();
                },500);
            });

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

        T.request('sections', function(data){
            var i;
            for (i in data.sections) {
                Deals.addNewList(data.sections[i]);
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