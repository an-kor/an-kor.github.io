var Deals = {
    appendDeals: function(wrapper){
        var dealItems = T.query('#deallist_' + wrapper.index + ' .deallist-item');
        App.isDealsLoading = 1;
        Deals.loadDeals(wrapper.index, dealItems.length, Styles.hScroller.numberOfImages, function(dealsElement){
                if (dealsElement) {
                    if (T.isIOS) {
                        var transitionTime = 0.8;
                        dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                        dealsElement.style.opacity = 0;
                    }
                    T.byId('hscroller-scroller-loading').style.display='none';
                    var el = T.byId('deallist_'+wrapper.index);
                    el.appendChild(dealsElement);
                    if (T.isIOS) {
                        setTimeout(function(){
                            dealsElement.style.opacity = 1;
                        }, 200);
                    }
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
                if (T.isIOS) {
                    if (e.target.scrollTop == 0) {
                        e.target.scrollTop = 1
                    }
                }
                if(!App.isDealsLoading && (e.target.scrollTop > e.target.scrollHeight - T.h()*1.3)) {
                    if (e.target.scrollTop > e.target.scrollHeight - T.h()) {
                        T.byId('hscroller-scroller-loading').style.display='block';
                    }
                    Deals.appendDeals(e.target);

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
                    var wrapper = T.byId('wrapper_' + this.options.index)
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
    loadDeals: function(type, from, limit, callback, errorCallback){
        var dealsText = '';
        T.request('deals', function(data){
            try {
                if (data.length) {
                    for (var i in data) {
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
            type: type,
            from: from,
            limit: limit
        }, function(){
            errorCallback(false);
        });
    }
};