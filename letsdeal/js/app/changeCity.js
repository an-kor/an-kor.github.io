App.showChangeCityPage = function(){
    if (App.addPage()) {
        var currentEl, newEl;
        currentEl = T.byId('pages-current');
        newEl = document.createElement("div");
        newEl.id = "pages-changecity";
        newEl.style.width = T.w()+'px';
        var template = T.byId('changecity-page-template').innerHTML;
        template = template.replace('%TITLE%', Messages.selectCity);
        newEl.innerHTML = template;
        currentEl.parentNode.appendChild(newEl);
        if (T.isIOS) {
            if (App.cityScroller) {
                App.cityScroller.destroy();
            }
            App.cityScroller = new IScroll(T.query('.search-wrapper'), {
                scrollbars: true,
                hideScrollbarsOnMove:true
            });
        }
        for (var i in App.cities) {
            App.addChangeCityItem(App.cities[i]);
        }
        App.addChangeCityItem({
            id: 'default',
            name: Messages.restOfCountry
        });
        T.initHover(T.query('.top-menu-back-btn'), Styles.footer.bgColorHover);
        App.changeHash('/city/');
    }
};

App.addChangeCityItem = function(data){
    var newEl = document.createElement("div");
    var template = T.byId('changecity-item-template').innerHTML;
    template = template.replace('%TITLE%', data.name);
    newEl.className = 'changecity-item';
    if (data.id == App.currentCityId) {
        newEl.className += ' item-active';
    }
    newEl.innerHTML = template;
    newEl.onclick = function(){
        var previousCityId = App.currentCityId;
        App.currentCityId = data.id;

        var el = T.query('#hscroller-scroller-list > li:nth-child(1)'), setActive = 0;
        el.parentNode.removeChild(el);
        el = T.query('#top-menu-tabs > li:nth-child(1)');
        if (el.className == 'top-menu-tabs-active') {
            setActive = 1;
        }
        el.parentNode.removeChild(el);

        if (previousCityId != 'default') {
            el = T.query('#hscroller-scroller-list > li:nth-child(2)');setActive = 0;
            el.parentNode.removeChild(el);
            el = T.query('#top-menu-tabs > li:nth-child(2)');
            if (el.className == 'top-menu-tabs-active') {
                setActive = 1;
            }
            el.parentNode.removeChild(el);
        }

        if (App.currentCityId == 'default') {
            Deals.addNewList(App.startCities[App.startCities.length-1], 0);
            window.localStorage.setItem('userCityId', App.currentCityId);
        } else {
            for (var i in App.cities) {
                if (App.cities[i].id == data.id) {
                    Deals.addNewList(App.cities[i], 1);
                    Deals.addNewList(App.startCities[i], 0);
                    try{
                        window.localStorage.setItem('userCityId', App.cities[i].id);
                    } catch (e){}
                    if (setActive) {
                        T.query('#top-menu-tabs > li:nth-child(2)').className = 'top-menu-tabs-active';
                    }
                }
            }
        }
        if (previousCityId != 'default') {
            Styles.hScroller.numberOfPages--;
        }
        Styles.hScroller.numberOfPages--;
        T.updateStyle('#hscroller-scroller', {
            width: T.w()*Styles.hScroller.numberOfPages+'px'
        });
        App.mainPageHScroll.goToPage(0, 0, 0);
        App.mainPageHScroll.refresh();
        App.goBack();
    };
    T.initHover(newEl, Styles.searchItem.bgColorHover);
    T.query('.changecity-scroller').appendChild(newEl);
    if (App.searchScroller) {
        App.searchScroller.refresh();
    }
};