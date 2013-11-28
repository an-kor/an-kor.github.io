var Deals = {
    addNewList: function(data, index){
        if (typeof(index)=='undefined'){
            index = Styles.numberOfPages;
        }
        var pageTpl = Templates.dealsPage(data.id);
        var previousPage = T.query('#main-page-scroller-list > li:nth-child('+(index)+')');
        var newPage = document.createElement("li");
        newPage.innerHTML = pageTpl;

        var wrapper = newPage.firstChild;
        wrapper.index = data.id;
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
                var el = T.byId('deallist_'+e.target.index);
                App.isDealsLoading = 1;

                //var loadingElement = document.createElement("div");
                //loadingElement.className = 'loading-icon';

                //el.appendChild(loadingElement);
                if (e.target.scrollTop > e.target.scrollHeight - T.h()) {
                    T.byId('main-page-scroller-loading').style.display='block';
                }

                var dealItems = T.query('#deallist_'+e.target.index + ' .deallist-item');
                var wrapper = e.target;
                Deals.loadDeals(data.id, dealItems.length, Styles.numberOfImages, function(dealsElement){
                    if (dealsElement) {
                        if (T.isIOS) {
                            var transitionTime = 0.8;
                            dealsElement.style.webkitTransition = 'opacity '+transitionTime+'s';
                            dealsElement.style.opacity = 0;
                        }

                        //el.removeChild(loadingElement);
                        T.byId('main-page-scroller-loading').style.display='none';
                        el.appendChild(dealsElement);
                        if (T.isIOS) {
                            setTimeout(function(){
                                dealsElement.style.opacity = 1;
                            }, 200);
                        }
                        App.isDealsLoading = 0;
                    } else {
                        T.byId('main-page-scroller-loading').style.display='none';
                        if (T.isIOS) {
                            App.isDealsLoading = 1;
                            wrapper.scrollTop = wrapper.scrollTop - 1;
                            setTimeout(function(){
                                App.isDealsLoading = 0;
                            }, 200);
                        } else {
                            App.isDealsLoading = 0;
                        }
                    }
                });
            }
        });

        if (previousPage.length === 0) {
            T.byId('main-page-scroller-list').appendChild(newPage);
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
                    return App.goToPage(i-1);
                }
            }
        });

        if (data.id=='shopping') {
            var catDropdown = document.createElement("div");
            catDropdown.innerHTML = Templates.catDropdown();
            T.byId('deallist_'+data.id).appendChild(catDropdown);
        }

        Deals.loadDeals(data.id, 0, Styles.numberOfImages, function(result){
            if (result) {
                T.byId('deallist_'+data.id).appendChild(result)
            }
        });
        Styles.numberOfPages++;
    },
    loadDeals: function(type, from, limit, callback){
        var dealsText = '';
        T.request('deals', function(data){
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
        }, {
            type: type,
            from: from,
            limit: limit
        }, function(){
            callback(false);
        });
    }
};