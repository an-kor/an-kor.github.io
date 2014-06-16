// Class for loading and displaying lists of deals and deal's info
var Deals = {
    // list of loaded deals (cache)
    loadedDeals: [],
    // blur background for Share deal page
    blurBackground: function(){
        if (T.isIOS) {
             T.byId('pages-new').style.webkitFilter = 'blur('+ T.px(15)+')';
             T.byId('top-menu-background').style.webkitFilter = 'blur('+ T.px(15)+')';
        }
    },
    // restore blurred background
    removeBackgroundBlur: function(){
        if (T.isIOS) {
            T.byId('pages-new').style.webkitFilter = null;
            T.byId('top-menu-background').style.webkitFilter = null;
        }
    },
    // shows modal window with information about a deal endtime ("En deal avslutas när klockan räknat ned till noll...")
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
        this.blurBackground();
    }
};