/* Adds a new section to the horizontal scrolling and preload first deals
  * @param data - array of deals that were loaded by ajax request
  * @param index - position index of a new section in the horizontal scroller
  * @param numberOfDeals - how many deals to preload
  */
Deals.addNewList = function(data, index, numberOfDeals){
    if (typeof(index)=='undefined' || index === null){
        index = Styles.hScroller.numberOfPages;
    }
    var pageTpl = Templates.dealsPage(data.id);
    var previousPage = T.query('#hscroller-scroller-list > li:nth-child('+(index)+')');
    var newPage = document.createElement("li");
    newPage.innerHTML = pageTpl;

    if (!numberOfDeals || isNaN(numberOfDeals)) {
        numberOfDeals = App.numberOfDealsPerLoad
    }

    var wrapper = newPage.firstChild;
    wrapper.index = data.id;

    if (!(T.isAndroid2 || T.isIOS)) {
        wrapper.addEventListener("scroll",function(e){
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
        var scroller = new FTScroller(wrapper, {
            index: wrapper.index,
            scrollingX: false,
            //bouncing:false,
            //scrollResponseBoundary: 100,
            scrollBoundary: 5
        });

        scroller.addEventListener('reachedend', function (response) {
            if(!App.isDealsLoading) {
                T.byId('hscroller-scroller-loading').style.display='block';
                var wrapper = T.byId('wrapper_' + response.index);
                Deals.appendDeals(wrapper);
            }
        });
    }

    if (previousPage.length === 0 && index!==0) {
        T.byId('hscroller-scroller-list').appendChild(newPage);
    } else {
        if (index===0) {
            var hScroller = T.byId('hscroller-scroller-list')
            hScroller.insertBefore(newPage, hScroller.firstChild);
        } else {
            previousPage.parentNode.insertBefore(newPage, previousPage.nextSibling);
        }
    }
    var headerTpl = Templates.dealsPageHeader(data);

    var previousHeader = T.query('#top-menu-tabs > li:nth-child('+(index)+')');
    var newHeader = document.createElement("li");
    newHeader.innerHTML = headerTpl;
    if (previousHeader.length === 0 && index!==0) {
        T.byId('top-menu-tabs').appendChild(newHeader);
    } else {

        if (index===0) {
            var topTabs = T.byId('top-menu-tabs');
            topTabs.insertBefore(newHeader, topTabs.firstChild);
        } else {
            previousHeader.parentNode.insertBefore(newHeader, previousHeader.nextSibling);
        }
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
        var createDropdown = function(data){
            var catDropdown = Templates.catDropdown(data.categories, function(value){
                var sections = App.sections.concat(App.cities);
                for (var i in sections) {
                    if (sections[i].id == data.id) {
                        sections[i].currentCategory = value;
                    }
                }
                var divs = T.query('#deallist_'+data.id+' > div');
                if (!divs.length){
                    if (divs.parentNode) {
                        divs.parentNode.removeChild(divs);
                    }
                } else {
                    for (i=0;i<divs.length;i++){
                        divs[i].parentNode.removeChild(divs[i]);
                    }
                }
                Deals.loadDeals(data.id, 0, numberOfDeals, function(result){
                    if (result) {
                        T.byId('deallist_'+data.id).appendChild(result)
                    }
                });
            });
            var el = T.byId('deallist_'+data.id);
            el.insertBefore(catDropdown, el.firstChild);
        };
        setTimeout(function(){
            createDropdown(data);
        },0);
    } else {
        var addPadding = function(data){
            var catPadding = document.createElement("div");
            catPadding.style.height = T.px(Styles.topMenu.height);
            var el = T.byId('deallist_'+data.id);
            el.insertBefore(catPadding, el.firstChild);
        };
        setTimeout(function(){
            addPadding(data);
        },0);
    }

    Deals.loadDeals(data.id, 0, numberOfDeals, function(result){
        if (result) {
            T.byId('deallist_'+data.id).appendChild(result)
        }
    });

    Styles.hScroller.numberOfPages++;
    T.updateStyle('#hscroller-scroller', {
        width: T.w()*Styles.hScroller.numberOfPages+'px'
    });
    T.setW('top-menu-tabs', T.w()*Styles.hScroller.numberOfPages);

    if (App.mainPageHScroll) {
        App.mainPageHScroll.refresh()
    }
};