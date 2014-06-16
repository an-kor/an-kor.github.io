Templates.preparePages = function(){
    //T.byId('pages-wrapper').style.bottom = T.p(Styles.footer.height) + 'px';
    T.setW('pages-scroller', T.w()*5);

    T.updateStyle('#pages-scroller > div', {
        width: T.w()+'px'
    });

    App.pagesScroll = new IScroll(T.byId('pages-wrapper'), {
        scrollX: true,
        scrollY: 0
    });
    App.pagesScroll.disable();
};