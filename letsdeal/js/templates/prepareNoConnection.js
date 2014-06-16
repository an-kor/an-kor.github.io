Templates.prepareNoConnection = function(){
    T.updateStyle('#splash-noconnection-button-pane', {
        bottom: T.px(150)
    });
    T.updateStyle('#splash-noconnection-button', {
        top: T.px(10),
        padding: T.px(10) + ' 0',
        fontSize: T.px(46),
        height: T.px(80),
        lineHeight: T.px(65),
        width: T.px(400),
        margin: '0 ' + (T.w() - T.p(400))/2+'px'
    });
    T.updateStyle('#splash-noconnection-button-pane', {
        height: T.px(100)
    });
    T.updateStyle('#splash-noconnection-message', {
        bottom: T.px(270),
        fontSize: T.px(30)
    });
    T.updateStyle('#splash-noconnection-tag', {
        bottom: T.px(400)
    });
    if (T.h() < 950) {
        T.updateStyle('#splash', {
            backgroundPosition: '50% ' + T.px(100)
        });
        T.updateStyle('#splash-noconnection-button-pane', {
            bottom: T.px(50)
        });
        T.updateStyle('#splash-noconnection-message', {
            bottom: T.px(170)
        });
        T.updateStyle('#splash-noconnection-tag', {
            bottom: T.px(300)
        });
    }
};