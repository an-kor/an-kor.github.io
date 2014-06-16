Deals.showSharePage = function () {
    var template = T.byId('dealinfo-share-template').innerHTML;
    template = template.replace('%TITLE_MSG%', Messages.shareWithFriends);
    template = template.replace('%CANCEL_MSG%', Messages.cancel);
    var shareText = encodeURIComponent(Messages.shareText.replace('%NAME%', Deals.loadedDeals[App.currentDeal].title)).replace(/'/g, "%27");
    var shareTitle = encodeURIComponent(Messages.shareTitle).replace(/'/g, "%27");
    var shareTextWithLink = encodeURIComponent(Messages.shareTextWithLink.replace('%NAME%', Deals.loadedDeals[App.currentDeal].title).replace('%LINK%', location.href)).replace(/'/g, "%27");
    var viaTwitter = encodeURIComponent(Messages.viaTwitter).replace(/'/g, "%27");

    template = template.replace(/%FACEBOOK%/g,
        'https://www.facebook.com/dialog/feed?' +
            'app_id=' + Messages.facebookAppId +
            '&display=popup' +
            '&name='
            + encodeURIComponent(Messages.shareFacebookText) +
            '&link='
            + encodeURIComponent(location.href) +
            '&caption='
            + encodeURIComponent(Deals.loadedDeals[App.currentDeal].title) +
            '&picture='
            + encodeURIComponent(Deals.loadedDeals[App.currentDeal].imageSrc) +
            '&redirect_uri='
            + encodeURIComponent(location.href)
    );

    template = template.replace(/%EMAIL%/g, ('mailto:?subject='+shareTitle+'&body='+shareTextWithLink).replace('%27','\''));
    template = template.replace(/%TWITTER%/g, 'https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href)+'&text='+shareText+'&via='+viaTwitter);
    this.blurBackground();
    T.byId('page-on-top').innerHTML = template;
    T.query('.dealinfo-share-block', 1).style.marginTop = T.h() - 4.5 * T.p(80) + 'px';
    T.byId('page-on-top').style.display = 'block';
};

Deals.hideSharePage = function () {
    this.removeBackgroundBlur();
    T.byId('page-on-top').style.display = 'none';
}