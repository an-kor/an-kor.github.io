var Deals = {
    loadedDeals: {},
    showSharePage: function () {
        var template = T.byId('dealinfo-share-template').innerHTML;
        template = template.replace('%TITLE_MSG%', Messages.shareWithFriends);
        template = template.replace('%CANCEL_MSG%', Messages.cancel);
        var shareText = encodeURIComponent(Messages.shareText.replace('%NAME%', Deals.loadedDeals[App.currentDeal].title));
        var shareTitle = encodeURIComponent(Messages.shareTitle);
        var shareTextWithLink = encodeURIComponent(Messages.shareTextWithLink.replace('%NAME%', Deals.loadedDeals[App.currentDeal].title).replace('%LINK%', location.href));
        var viaTwitter = encodeURIComponent(Messages.viaTwitter);
        template = template.replace('%FACEBOOK%', 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+encodeURIComponent(location.href)+'&p[title]='+shareTitle+'&p[summary]='+shareText);
        template = template.replace('%EMAIL%', 'mailto:?subject='+shareTitle+'&body='+shareTextWithLink);
        template = template.replace('%TWITTER%', 'https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href)+'&text='+shareText+'&via='+viaTwitter);
        T.byId('page-on-top').innerHTML = template;
        T.query('.dealinfo-share-block', 1).style.marginTop = T.h() - 5.5 * T.p(80) + 'px';
        T.byId('page-on-top').style.display = 'block';
    },
    hideSharePage: function () {
        T.byId('page-on-top').style.display = 'none';
    },
    showCountdownInfoPage: function () {
        var template = T.byId('dealinfo-countdowninfo-template').innerHTML;
        template = template.replace('%INFO%', Messages.countdownInfo);
        template = template.replace('%CANCEL_MSG%', Messages.cancel);
        T.byId('page-on-top').innerHTML = template;
        T.byId('page-on-top').style.display = 'block';
        T.query('.dealinfo-share-block', 1).style.padding = T.px(20);
        var h = T.query('.dealinfo-share-block', 1).offsetHeight;
        T.query('.dealinfo-share-block', 1).style.marginTop = T.h() - (h + T.p(120)) + 'px';
        T.query('.dealinfo-share-block', 1).style.height = h + 'px';
    },
    showBuyPage:function(dealId){
        var data = Deals.loadedDeals[dealId];
        App.showIFrame(data.title, Messages.buySrc.replace("%DEAL_ID%", data.id));
        App.changeHash('/buy/'+dealId);
    },
    showDeal:function(dealId){
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
                if(Deals.loadedDeals[dealId]) {
                    var data = Deals.loadedDeals[dealId];
                    //template = template.replace("%TITLE%", data.title);
                    template = template.replace("%SHARE%", Messages.share);
                    template = template.replace("%IMAGESRC%", data.imageSrc);
                    template = template.replace("%MAP_ID%", "dealinfo-map-"+data.id);
                    template = template.replace("%SHORT_DESCRIPTION%", data.info);
                    bottomTemplate = bottomTemplate.replace("%BULK%", T.formatNumber(data.bulk) + " " + Messages.bought);
                    bottomTemplate = bottomTemplate.replace("%BUY_MSG%", Messages.buy);
                    bottomTemplate = bottomTemplate.replace("%DEAL_ID%", data.id);
                    bottomTemplate = bottomTemplate.replace("%OLDPRICE%", (data.origPrice!=data.price)?T.formatNumber(data.origPrice)+" "+Messages.kr:"");
                    bottomTemplate = bottomTemplate.replace("%NEWPRICE%", T.formatNumber(data.price)+" "+Messages.kr);
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
            T.request('dealinfo', function(dealInfo){
                var el = T.query('.dealinfo-content-details'), template = el.innerHTML;
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
                    var map = L.map("dealinfo-map-"+data.id).setView([data.lat, data.lon], 13);
                    var marker = L.marker([data.lat, data.lon]).addTo(map);
                    L.tileLayer('https://mts0.google.com/vt/lyrs=m@240000000&hl=sv&src=app&x={x}&y={y}&z={z}&s=Ga', {
                        attribution: '',
                        maxZoom: 19
                    }).addTo(map);
                } else {
                    T.byId("dealinfo-map-"+data.id).style.display = 'none';
                }
                T.query('.content-loading',1).style.display = 'none';
                if (T.isIOS) {
                    if (App.dealInfoScroller) {
                        App.dealInfoScroller.destroy();
                    }
                    App.dealInfoScroller = new IScroll(T.query('.dealinfo-wrapper'), {
                        scrollbars: true,
                        hideScrollbarsOnMove:true
                    });
                    setTimeout(function(){
                        App.dealInfoScroller.refresh();
                    },500);
                }
            }, {dealId: data.id}, function(){
                T.query('.content-loading', 1).style.display = 'none';
                var scroller = new IScroll(T.query('.dealinfo-wrapper'));
                setTimeout(function(){
                    scroller.refresh();
                },500);
            });

            var bottomEl = document.createElement("div");
            bottomEl.innerHTML = bottomTemplate;
            newEl.appendChild(bottomEl);
            T.initHover(T.query('.dealinfo-bottom-buyBtn'),Styles.dealInfo.bottom.buyBtn.bgColorHover);
            T.initHover(T.query('.top-menu-back-btn, .top-menu-share-btn'), Styles.footer.bgColorHover);
            App.currentDeal = dealId;
            App.changeHash('/deal/'+dealId);
        }
    },
    appendDeals: function(wrapper){
        App.mainPageHScroll.currentPageIndex = T.query('#hscroller-scroller-list > li:nth-child('+(App.mainPageHScroll.currentPage.pageX+1)+') > div').id;
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
                    setTimeout(function(){
                        App.isDealsLoading = 0;
                    },1000);
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
                    return App.changeHScrollerPage(i);
                }
            }
        });
        if (data.categories) {
            var catDropdown = Templates.catDropdown(data.categories, function(value){
                var sections = App.sections.concat(App.cities);
                for (var i in sections) {
                    if (sections[i].id == data.id) {
                        sections[i].currentCategory = value;
                    }
                }
                var divs = T.query('#deallist_'+data.id+' > div');
                if (!divs.length){
                    divs.parentNode.removeChild(divs);
                } else {
                    for (i=0;i<divs.length;i++){
                        divs[i].parentNode.removeChild(divs[i]);
                    }
                }
                Deals.loadDeals(data.id, 0, Styles.hScroller.numberOfImages, function(result){
                    if (result) {
                        T.byId('deallist_'+data.id).appendChild(result)
                    }
                });
            });
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
        var dealsText = '', sections = App.sections.concat(App.cities), category = 0;
        for (var i in sections) {
            if (sections[i].id == section && sections[i].currentCategory) {
                category = sections[i].currentCategory;
            }
        }
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
            category: category,
            from: from,
            limit: limit
        }, function(){
            errorCallback(false);
        });
    }
};