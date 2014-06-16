App.lastCheckConnectionTs = new Date().getTime();
App.checkConnectionInterval = 5000;
App.checkConnection = function(force){
    if (force || new Date().getTime() - App.lastCheckConnectionTs > 180*App.checkConnectionInterval) {
        if (!App.initialized) {
            App.init();
            T.byId('container').style.display='block';
        } else {
            var length = 1, id;
            try {
                id = App.mainPageHScroll.currentPageIndex.substr(8);
                var divs = T.query('#deallist_'+id+' > div', false);
                length = divs.length;
                for (var i=0; i<length; i++){
                    divs[i].parentNode.removeChild(divs[i]);
                }
            } catch(e) {
                id = 'shopping';
            }
            T.byId('hscroller-scroller-loading').style.display='block';
            Deals.loadDeals(id, 0, App.numberOfDealsPerLoad*length, function(result){
                App.hideNoConnection();
                if (result) {
                    T.byId('deallist_'+id).appendChild(result);
                    T.byId('hscroller-scroller-loading').style.display='none';
                }
            });
        }
    }
    App.lastCheckConnectionTs = new Date().getTime();
};
App.hideNoConnection = function(){
    App.isOffline = false;
    T.byId('container').style.display = 'block';
    T.byId('splash').style.display = 'none';
};
App.showNoConnection = function(){
    App.isOffline = true;
    var template = T.byId('noconnection-template').innerHTML;
    template = template.replace('%TITLE%', Messages.noConnectionTitle);
    template = template.replace('%MSG%', Messages.noConnectionMsg);
    T.byId('container').style.display = 'none';
    T.byId('splash-message').style.display = 'none';
    T.byId('splash-loading').style.display = 'none';
    T.byId('splash').style.display = 'block';
    T.byId('splash-noconnection').style.display = 'block';
    T.byId('splash-noconnection').innerHTML = template;
};