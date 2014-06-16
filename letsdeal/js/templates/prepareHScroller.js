Templates.prepareHScroller = function(){
    T.setH('hscroller-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
    T.updateStyle('#hscroller-scroller', {
        top:0,
        height: T.h()-T.p(Styles.footer.height, 1)+1+'px',
        width: T.w()*Styles.hScroller.numberOfPages+'px',
        borderTop: T.px(2) + ' solid ' + Styles.hScroller.bgColor
    });
    T.updateStyle('#hscroller-scroller-background', {
        backgroundSize: '1px ' + T.px(65),
        height: T.px(64),
        top: T.h() - T.p(Styles.topMenu.height+Styles.footer.height+60)+'px'
    });
    T.updateStyle('#hscroller-scroller-list', {
        backgroundSize: '1px ' + T.px(64),
        backgroundColor: Styles.hScroller.bgColor
    });
    T.updateStyle('#hscroller-scroller-list > li', 'width', T.w() + 'px');
    T.updateStyle('.ftscroller_scrollbary', {
        top: T.px(Styles.topMenu.height)
    });
    App.mainPageHScroll = new IScroll(T.byId('hscroller-wrapper'), {
        scrollX: true,
        scrollY: 0,
        snap: true,
        momentum: false,
        //bounce: false,
        snapThreshold: 0.05,
        lockDirection: true,
        directionLockThreshold: 20,
        eventPassthrough: 'vertical',
        preventDefault: true,
        indicators: [{
            notUseTransform:1,
            el: T.byId('top-menu-wrapper'),
            resize: 0,
            ignoreBoundaries: true,
            speedRatioX: 0.5,
            listenY: false
        }]
    });
    App.mainPageHScroll.currentPageIndex = T.query('#hscroller-scroller-list > li:nth-child(1) > div').id;
    App.mainPageHScroll.on('translate', function(){
        T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
        T.query('#top-menu-wrapper li:nth-child('+(this.currentPage.pageX+1)+')').className = 'top-menu-tabs-active';
        App.mainPageHScroll.currentPageIndex = T.query('#hscroller-scroller-list > li:nth-child('+(this.currentPage.pageX+1)+') > div').id;
    });
    App.mainPageHScroll.scrollActive = 0;
    App.mainPageHScroll.on('scrollStart', function(){
        App.mainPageHScroll.scrollActive = 1;
    });
    App.mainPageHScroll.on('scrollEnd', function(){
        App.mainPageHScroll.scrollActive = 0;
    });
};