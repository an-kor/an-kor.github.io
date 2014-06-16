Deals.appendDeals = function(wrapper){
    App.mainPageHScroll.currentPageIndex = T.query('#hscroller-scroller-list > li:nth-child('+(App.mainPageHScroll.currentPage.pageX+1)+') > div').id;
    var dealItems = T.query('#deallist_' + wrapper.index + ' .deallist-item');
    App.isDealsLoading = 1;
    Deals.loadDeals(wrapper.index, dealItems.length, App.numberOfDealsPerLoad, function(dealsElement){
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
};