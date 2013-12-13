var Deals = {
    loadedDeals: {},
    showSharePage: function () {
        var template = T.byId('dealinfo-share-template').innerHTML;
        template = template.replace('%TITLE_MSG%', Messages.shareWithFriends);
        template = template.replace('%CANCEL_MSG%', Messages.cancel);
        T.byId('page-on-top').innerHTML = template;
        T.query('.dealinfo-share-block')[0].style.marginTop = T.h() - 5.5 * T.p(80) + 'px';
        T.byId('page-on-top').style.display = 'block';
    },
    hideSharePage: function () {
        T.byId('page-on-top').style.display = 'none';
    },
    showBuyPage:function(dealId){
        var data = Deals.loadedDeals[dealId];
        App.showIFrame(Messages.buy +' '+ data.title, Messages.buySrc.replace("%DEAL_ID%", data.id));
    },
    showDeal:function(dealId){
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
            var data = Deals.loadedDeals[dealId];
            template = template.replace("%TITLE%", data.title);
            template = template.replace("%IMAGESRC%", data.imageSrc);
            template = template.replace("%MAP_ID%", "dealinfo-map-"+data.id);
            template = template.replace("%SHORT_DESCRIPTION%", data.shortDescription);
            bottomTemplate = bottomTemplate.replace("%BULK%", T.formatNumber(data.bulk) + " " + Messages.bought);
            bottomTemplate = bottomTemplate.replace("%BUY_MSG%", Messages.buy);
            bottomTemplate = bottomTemplate.replace("%DEAL_ID%", data.id);
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
        App.addPage();
    },
    appendDeals: function(wrapper){
        var dealItems = T.query('#deallist_' + wrapper.index + ' .deallist-item');
        App.isDealsLoading = 1;
        Deals.loadDeals(wrapper.index, dealItems.length, Styles.hScroller.numberOfImages, function(dealsElement){
                T.byId('hscroller-scroller-loading').style.display='none';
                if (dealsElement) {
                    if (T.isIOS) {
                        var transitionTime = 0.8;
                        dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                        dealsElement.style.opacity = 0;
                    }
                    var el = T.byId('deallist_'+wrapper.index);
                    el.appendChild(dealsElement);
                    if (T.isIOS) {
                        setTimeout(function(){
                            dealsElement.style.opacity = 1;
                        }, 200);
                    }
                    App.isDealsLoading = 0;
                } else {
                    App.isDealsLoading = 0;
                }
            }, function(){
                T.byId('hscroller-scroller-loading').style.display='none';
                if (T.isIOS) {
                    wrapper.scrollTop = wrapper.scrollTop - 1;
                    setTimeout(function(){
                        App.isDealsLoading = 0;
                    }, 200);
                } else {
                    App.isDealsLoading = 0;
                }
            }
        );
    },
    addNewList: function(data, index){
        if (typeof(index)=='undefined'){
            index = Styles.hScroller.numberOfPages;
        }
        var pageTpl = Templates.dealsPage(data.id);
        var previousPage = T.query('#hscroller-scroller-list > li:nth-child('+(index)+')');
        var newPage = document.createElement("li");
        newPage.innerHTML = pageTpl;

        var wrapper = newPage.firstChild;
        wrapper.index = data.id;

        if (!T.isAndroid2) {
            if (T.isIOS) {
                wrapper.scrollTop = 1
            }
            wrapper.addEventListener("scroll",function(e){
                //var el = T.byId(App.mainPageHScroll.currentPageIndex);
                var el = e.target;
                if (T.isIOS) {
                    if (el.scrollTop == 0) {
                        el.scrollTop = 1
                    }
                }
                if(!App.isDealsLoading && (el.scrollTop > el.scrollHeight - T.h()*1.3)) {
                    if (el.scrollTop > el.scrollHeight - T.h()*1.5) {
                        T.byId('hscroller-scroller-loading').style.display='block';
                    }
                    Deals.appendDeals(T.byId(App.mainPageHScroll.currentPageIndex));

                }
            });
        } else {
            var scrollerOptions = {
                index: wrapper.index,
                startX: 0,
                startY: 0,
                scrollX: false,
                scrollY: true,
                scrollbars: true,
                lockDirection: true
            };
            var scroller = new IScroll(wrapper, scrollerOptions);
            scroller.on('translate', function(){
                if(!App.isDealsLoading && Math.abs(this.y) > Math.abs(this.maxScrollY)) {
                    T.byId('hscroller-scroller-loading').style.display='block';
                    var wrapper = T.byId('wrapper_' + this.options.index);
                    Deals.appendDeals(wrapper);
                }
            });
        }

        if (previousPage.length === 0) {
            T.byId('hscroller-scroller-list').appendChild(newPage);
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
                    return App.changeHScrollerPage(i-1);
                }
            }
        });

        if (data.id=='shopping') {
            var catDropdown = document.createElement("div");
            catDropdown.innerHTML = Templates.catDropdown();
            T.byId('deallist_'+data.id).appendChild(catDropdown);
        }

        Deals.loadDeals(data.id, 0, Styles.hScroller.numberOfImages, function(result){
            if (result) {
                T.byId('deallist_'+data.id).appendChild(result)
            }
        });
        Styles.hScroller.numberOfPages++;
    },
    loadDeals: function(section, from, limit, callback, errorCallback){
        var dealsText = '';
        T.request('deals', function(data){
            try {
                if (data.length) {
                    for (var i in data) {
                        Deals.loadedDeals[data[i].id] = data[i];
                        dealsText += Templates.dealsItem(data[i]);
                    }
                    var dealsElement = document.createElement("div");
                    dealsElement.innerHTML = dealsText;
                    callback(dealsElement);
                } else {
                    callback(false);
                }
            } catch (e) {
                console.error(e);
                errorCallback();
            }
        }, {
            section: section,
            from: from,
            limit: limit
        }, function(){
            errorCallback(false);
        });
    }
};