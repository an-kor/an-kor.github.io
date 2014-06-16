App.showSearchPage = function(){
    if (App.addPage()) {
        var currentEl, newEl;
        currentEl = T.byId('pages-current');
        newEl = document.createElement("div");
        newEl.id = "pages-search";
        newEl.style.width = T.w()+'px';
        var template = T.byId('search-page-template').innerHTML;
        template = template.replace('%PLACEHOLDER%', Messages.searchPlaceholder);
        newEl.innerHTML = template;
        currentEl.parentNode.appendChild(newEl);
        var searchCatTpl = T.byId('search-categories-template').innerHTML;
        searchCatTpl = searchCatTpl.replace('%HEADER%', Messages.searchCategories);
        var searchCatItemTpl = T.byId('search-categories-item-template').innerHTML, searchCategoriesHTML = '';

        for (var i in App.searchCategories) {
            var searchCatItemCurrent = searchCatItemTpl;
            searchCatItemCurrent = searchCatItemCurrent.replace(new RegExp('%ICON%', 'g'), App.searchCategories[i].icon);
            searchCatItemCurrent = searchCatItemCurrent.replace(new RegExp('%NAME%', 'g'), App.searchCategories[i].name);
            searchCatItemCurrent = searchCatItemCurrent.replace(new RegExp('%ID%', 'g'), App.searchCategories[i].id);
            searchCategoriesHTML += searchCatItemCurrent;
        }
        searchCatTpl = searchCatTpl.replace('%CATEGORIES%', searchCategoriesHTML);
        T.byId('search-categories-template').innerHTML = searchCatTpl;
        T.query('.search-scroller').innerHTML = searchCatTpl;
        T.initHover(T.query('.search-cat'), Styles.searchItem.bgColorHover);
        if (T.isIOS) {
            if (App.searchScroller) {
                App.searchScroller.destroy();
            }
            App.searchScroller = new IScroll(T.query('.search-wrapper'), {
                scrollbars: true,
                hideScrollbarsOnMove:true
            });
        }
        T.query('.top-menu-search-input').addEventListener('input', function() {
            if (this.value!=''){
                T.query('#top-menu-search-input-empty').style.display = 'block';
            } else {
                T.query('#top-menu-search-input-empty').style.display = 'none';
            }
            App.searchDeal(this.value);
        });
        T.query('#top-menu-search-input-empty').addEventListener('click', function() {
             App.searchInputSetValue('');
             App.searchDeal('');
             T.query('.top-menu-search-input').focus();
        });
        T.query('#top-menu-search-input-empty').addEventListener('touchstart', function() {
            this.style.opacity = 0.5;
        });

        T.query('#top-menu-search-input-empty').addEventListener('touchend', function() {
            this.style.opacity = 1;
        });

        T.query('.search-noresults-title').innerHTML = Messages.noResults;
        T.query('.search-noresults-description').innerHTML = Messages.noResultsDescription;
        App.changeHash('/search/');
    }
};

App.searchDeal = function(value){
    T.query('.search-scroller').innerHTML='';
    if (value.indexOf('section:')==-1){
        App.searchInputSetValue(value);
    }
    T.query('.search-noresults').style.display = 'none';
    if (App.lastSearch != value) {
        App.lastSearch = value;
        T.request('dealsearch', function(data){
            if (data.length) {
                for (var i in data) {
                    App.addSearchItem(data[i]);
                }
            } else {
                if (value != '') {
                    T.query('.search-noresults').style.display = 'block';
                    T.query('.search-noresults-keyword').innerHTML = value;
                } else {
                    T.query('.search-noresults').style.display = 'none';
                    T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
                }
            }

            if (T.isIOS) {
                App.searchScroller.scrollTo(0,0);
            } else {
                T.query('.search-scroller').scrollTop = 0;
            }

        }, {text: App.lastSearch, city: App.currentCityId}, function(){
        });
    } else {
        T.query('.search-noresults').style.display = 'none';
        T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
    }
    App.changeHash('/search/'+value);
};

App.searchByCategory = function(value, title){
    T.query('.search-scroller').innerHTML='';
    App.searchInputSetValue(title);
    T.query('.search-noresults').style.display = 'none';
    if (App.lastSearch != value) {
        App.lastSearch = value;
        T.request('dealsearch', function(data){
            if (data.length) {
                for (var i in data) {
                    App.addSearchItem(data[i]);
                }
            } else {
                if (value != '') {
                    T.query('.search-noresults').style.display = 'block';
                    T.query('.search-noresults-keyword').innerHTML = value;
                } else {
                    T.query('.search-noresults').style.display = 'none';
                    T.query('.search-scroller').innerHTML = T.byId('search-categories-template').innerHTML;
                }
            }
        }, {text: App.lastSearch, city: App.currentCityId}, function(){
        });
    }
    App.changeHash('/search/'+value);
};

App.searchInputSetValue = function(value){
    T.query('.top-menu-search-input', 1).value = value;
    if (value!=''){
        T.query('#top-menu-search-input-empty').style.display = 'block';
    } else {
        T.query('#top-menu-search-input-empty').style.display = 'none';
    }
};

App.addSearchItem = function(data){
    Deals.loadedDeals[data.id] = data;
    var newEl = document.createElement("div");
    var template = T.byId('search-item-template').innerHTML;
    var section = '';
    if (T.inArray(data.type, App.sections, 'id')) {
        section = App.sections[T.inArray(data.type, App.sections, 'id')].name;
    }
    if (T.inArray(data.type, App.cities, 'id')) {
        section = App.cities[T.inArray(data.type, App.cities, 'id')].name;
    }
    template = template.replace('%TITLE%', data.title);
    template = template.replace('%DESCRIPTION%', section+': ' +data.info);
    template = template.replace('%IMG%', '<img src="'+data.smallimage+'" onload="this.style.display=\'block\'"/>');
    newEl.onclick=function(){
        Deals.showDeal(data.id);
    };
    //template = template.replace('%IMG%', '<img src="http://letsdeal-apiimages.s3.amazonaws.com/'+data.id+'.jpg" />');
    newEl.className = 'search-item';
    newEl.innerHTML = template;
    T.initHover(newEl, Styles.searchItem.bgColorHover);
    T.query('.search-scroller').appendChild(newEl);
    if (App.searchScroller) {
        App.searchScroller.refresh();
    }
};