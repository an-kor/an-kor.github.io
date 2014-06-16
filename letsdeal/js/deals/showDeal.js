/* Shows detail information about a deal
  * @param dealId - ID of a deal to show
  */
Deals.showDeal = function(dealId){
    if (App.addPage()){
        var currentEl, newEl;
        currentEl = T.byId('pages-current');
        newEl = document.createElement("div");
        newEl.id = "pages-new";
        newEl.style.width = T.w()+'px';
        var template = T.byId('deal-page-template').innerHTML;

        var contentTemplate = T.byId('dealinfo-content-template').innerHTML;
        var bottomTemplate = T.byId('dealinfo-bottom-template').innerHTML;
        template = template.replace("%CONTENT%", contentTemplate);
        if (dealId) {
            // if there is dealId among cached deals then display all cached data immediately
            if(Deals.loadedDeals[dealId]) {
                var data = Deals.loadedDeals[dealId];
                //template = template.replace("%TITLE%", data.title);
                template = template.replace("%BACK%", Messages.backBtn);
                template = template.replace("%SHARE%", Messages.share);
                template = template.replace("%IMAGESRC%", data.imageSrc);
                template = template.replace("%MAP_ID%", "dealinfo-map-"+data.id);
                template = template.replace("%SHORT_DESCRIPTION%", data.info);
                bottomTemplate = bottomTemplate.replace("%BULK%", T.formatNumber(data.bulk) + " " + Messages.bought);
                bottomTemplate = bottomTemplate.replace("%SOLD_OUT%", data.isSoldOut);
                if (data.isSoldOut==1) {
                    bottomTemplate = bottomTemplate.replace("%SOLD_OUT_CLASS%", "dealinfo-bottom-buyBtn-soldOut");
                    bottomTemplate = bottomTemplate.replace("%BUY_MSG%", Messages.soldOut);
                } else {
                    bottomTemplate = bottomTemplate.replace("%BUY_MSG%", Messages.buy);
                }
                bottomTemplate = bottomTemplate.replace("%DEAL_ID%", data.id);
                bottomTemplate = bottomTemplate.replace("%OLDPRICE%", (data.origPrice!=data.price && data.origPrice>0)?T.formatNumber(data.origPrice)+" "+Messages.kr:"");
                bottomTemplate = bottomTemplate.replace("%NEWPRICE%", T.formatNumber(data.price)+" "+Messages.kr);
                mixpanel.track(
                    "Deal View",
                    {
                        "Deal id": dealId,
                        "City": App.currentCityId
                    }
                );
                ga("send", "pageview", {
                  'page': "/#/deal/"+dealId,
                  'title': data.title
                });
            } else {
                return false;
            }
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
                T.query('.dealinfo-bottom-countdown').innerHTML = hours +" "+ Messages.hours+", " + minutes +" "+ Messages.minutes+", " + seconds +" "+ Messages.seconds + " " + Messages.left;
            } else {
                T.query('.dealinfo-bottom-countdown').innerHTML = '';
            }
        }, 1000);
        newEl.innerHTML = template;
        currentEl.parentNode.appendChild(newEl);

        // loads additional information about a deal
        T.request('dealinfo', function(dealInfo){
            var el = T.query('.dealinfo-content-details'), template = el.innerHTML;
            if (template) {
                template = template.replace("%ABOUT%", dealInfo.about);
                template = template.replace("%ABOUT_MSG%", Messages.about);
                template = template.replace("%HIGHLIGHTS%", dealInfo.highlights);
                template = template.replace("%HIGHLIGHTS_MSG%", Messages.highlights);
                template = template.replace("%TERMS%", dealInfo.terms);
                template = template.replace("%TERMS_MSG%", Messages.terms);
                template = template.replace("%CONTACTS%", dealInfo.contacts);
                template = template.replace("%SELLER%", dealInfo.seller);
                template = template.replace("%SELLER_MSG%", Messages.seller);
                if (dealInfo.otherImg && dealInfo.otherImg != "" && dealInfo.otherImg.indexOf('jpg')>-1) {
                    template = template.replace("%OTHER:", '');
                    template = template.replace(":OTHER%", '');
                    template = template.replace("%OTHER_MSG%", Messages.other);
                    template = template.replace("%OTHER_IMG%", '<img src="'+dealInfo.otherImg+'" style="display:none;" ' +
                        'onload="T.query(\'.dealinfo-content-loading\').style.display=\'none\';this.style.display=\'block\';if (App.dealInfoScroller) App.dealInfoScroller.refresh();"/>');
                } else {
                    template = template.replace(/%OTHER:.*:OTHER%/m, '');
                }
                el.innerHTML = template;
                el.style.display='block';
                if (data.lat > 0) {
                    var map = L.map("dealinfo-map-"+data.id, {zoomControl: false});
                    map.addControl( L.control.zoom({position: 'topright'}) )
                    map.setView([data.lat, data.lon], 13);
                    var marker = L.marker([data.lat, data.lon]).addTo(map);
                    L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                        attribution: '',
                        maxZoom: 19
                    }).addTo(map);
                } else {
                    T.byId("dealinfo-map-"+data.id).style.display = 'none';
                }
                T.query('.content-loading',1).style.display = 'none';

                // dealinfo scroller setup
                if (1 || T.isIOS) {
                    if (App.dealInfoScroller) {
                        App.dealInfoScroller.destroy();
                    }
                    App.dealInfoScroller = new IScroll(T.query('.dealinfo-wrapper'), {
                        scrollbars: true,
                        hideScrollbarsOnMove:true,
                        speedRatio: T.isAndroid?1:0.4
                    });
                    setTimeout(function(){
                        App.dealInfoScroller.refresh();
                    },500);
                }
            }
        }, {dealId: data.id}, function(){
            T.query('.content-loading', 1).style.display = 'none';
            if (T.isIOS) {
                var scroller = new IScroll(T.query('.dealinfo-wrapper'), {
                    scrollbars: true,
                    hideScrollbarsOnMove:true,
                    speedRatio: 0.4
                });
            }
            setTimeout(function(){
                scroller.refresh();
            },500);
        });

        var bottomEl = document.createElement("div");
        bottomEl.innerHTML = bottomTemplate;
        newEl.appendChild(bottomEl);
        T.initHover(T.query('.dealinfo-bottom-buyBtn'),Styles.dealInfo.bottom.buyBtn.bgColorHover, Styles.dealInfo.bottom.buyBtn.bgColor, 1);
        T.initHover(T.query('.top-menu-back-btn, .top-menu-share-btn'), Styles.footer.bgColorHover);
        App.currentDeal = dealId;
        App.changeHash('/deal/'+dealId);
    }
};