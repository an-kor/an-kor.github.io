Templates.prepareHeader = function(){
    if (T.p(Styles.topMenu.fontSize)>T.w()/15) {
        Styles.topMenu.fontSize = T.w()/T.p(15);
        Styles.topMenu.height = Styles.topMenu.fontSize*2;
    }

    T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));
    if (T.isStandalone) {
        document.body.style.position ='relative';
        document.body.style.top = '20px';
        T.updateStyle('.dealinfo-share', {
            height: T.h() + 'px'
        });
    }
    T.updateStyle('#top-menu-background', {
        height: T.p(Styles.topMenu.height) + 'px',
        background: Styles.topMenu.bgColor
    });

    var trHeight = Math.ceil(T.p(Styles.topMenu.height)/5.66);
    if (T.isAndroid && !T.isChrome) {
        T.updateStyle('#top-menu-triangle', {
            height: trHeight + 'px',
            top:  T.p(Styles.topMenu.height) - trHeight + 'px'
        });
    } else {
        T.updateStyle('#top-menu-triangle', {
            display: 'none'
        });
        T.updateStyle('#top-menu-wrapper', {
            webkitClipPath: 'polygon(0 0, 100% 0px, 100% '+T.px(Styles.topMenu.height)+', '+ (T.w()/2 + trHeight) +'px '+T.px(Styles.topMenu.height)+', ' + (T.w()/2) +'px ' + (T.p(Styles.topMenu.height)-trHeight)+'px, '+ (T.w()/2 - trHeight) +'px '+T.px(Styles.topMenu.height)+', 0 '+T.px(Styles.topMenu.height)+')'
        });
    }

    T.updateStyle('#top-menu-wrapper', {
        width: T.w() + 'px'
    });

    T.updateStyle('#top-menu-wrapper ul', {
        width: T.w()*Styles.hScroller.numberOfPages + 'px',
        paddingLeft: (T.w() - (T.w()/2))/2 + 'px'
    });

    T.updateStyle('#top-menu-wrapper li', {
        width: T.w()/2 + 'px',
        height: T.px(Styles.topMenu.height),
        //background: Styles.topMenu.bgColor,
        fontSize: T.px(Styles.topMenu.fontSize),
        fontWeight: Styles.topMenu.fontWeight,
        lineHeight: T.px(Styles.topMenu.height)
    });

    T.updateStyle('#top-menu-wrapper li a', {
        color: Styles.topMenu.color
    });

    T.updateStyle('.top-menu', {
        color: Styles.topMenu.color,
        fontSize: T.px(Styles.topMenu.fontSize),
        fontWeight: Styles.topMenu.fontWeight
    });

    T.updateStyle('.top-menu-back-btn', {
        width: T.px(Styles.topMenu.backButtonWith),
        backgroundPosition: T.px(24) + ' 50%',
        backgroundSize: T.px(24) + ' ' + T.px(42),
        fontSize: T.px(32),
        lineHeight: T.px(Styles.topMenu.height+5),
        paddingLeft: T.px(70)
    });

    T.updateStyle('.search-page .top-menu-back-btn', {
        //borderRight: 0,
        width: T.px(80)
    });

    T.updateStyle('.top-menu-share-btn', {
        width: T.px(Styles.topMenu.shareButtonWith),
        //borderLeft: T.px(1,1)+ ' solid rgba(255,255,255,0.2)',
        backgroundSize: T.px(80) + ' ' + T.px(80),
        lineHeight: T.px(Styles.topMenu.height+5),
        textAlign: 'center',
        color: 'white',
        fontSize: T.px(32)
    });

    T.updateStyle('.top-menu', {
        height: T.px(Styles.topMenu.height),
        borderBottom: T.px(1,1) + ' solid rgba(170,169,164,0.5)',
        boxShadow: (!T.isAndroid2)? '0px '+ T.px(1,1)+' '+ T.px(2,1)+' '+ T.px(1,1)+' rgba(170,169,164,0.3)':''
    });

    T.updateStyle('.top-menu-title', {
        width: T.w() - T.p(Styles.topMenu.backButtonWith) + 'px',
        //borderLeft: T.px(1,1)+ ' solid rgba(255,255,255,0.2)',
        paddingLeft: T.px(20),
        lineHeight: T.px(Styles.topMenu.height)
    });

    var topMenuTitleWidth = T.w() - T.p(Styles.topMenu.backButtonWith + Styles.topMenu.shareButtonWith);
    var topMenuTitlePosition = (topMenuTitleWidth - T.p(230))/2;
    if (topMenuTitlePosition < 0) {
        topMenuTitlePosition = 0;
    }
    T.updateStyle('.deal-page .top-menu-title', {
        width: topMenuTitleWidth + 'px',
        backgroundSize: 'contain',
        backgroundPosition: topMenuTitlePosition + 'px 50%'
    });

    T.query('#top-menu-wrapper li:nth-child(1)').className = 'top-menu-tabs-active';

    T.updateStyle('.iframe-wrapper', {
        top: T.px(Styles.topMenu.height),
        bottom: 0
    });
};