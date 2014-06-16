Templates.prepareModalPages = function(){
    T.updateStyle('.noconnection-page', {
        height: T.h() + 'px'
    });
    T.updateStyle('.noconnection-tag', {
        marginTop: T.px(140),
        height: T.px(160),
        backgroundSize: T.px(338) + " " + T.px(160)
    });
    T.updateStyle('.noconnection-msg', {
        marginTop: T.px(30),
        fontSize: T.px(35)
    });
    T.updateStyle('.noconnection-title', {
        fontSize: T.px(40)
    });

    T.updateStyle('.instructions-page', {
        height: T.h() + 'px'
    });
    T.updateStyle('.instructions-img-h', {
        height: T.px(250),
        backgroundSize: 'contain'
    });
    T.updateStyle('.instructions-img-v', {
        height: T.px(250),
        backgroundSize: 'contain'
    });
    T.updateStyle('.instructions-title', {
        marginTop: T.px(40),
        fontSize: T.px(60),
        fontWeight: 'bold'
    });
    T.updateStyle('.instructions-msg', {
        marginTop: T.px(30),
        fontSize: T.px(40)
    });
};