Templates.prepareSearch = function(){
    T.updateStyle('.top-menu-search', {
        width: T.w() - T.p(60) + 'px'
    });
    T.updateStyle('.top-menu-search input', {
        margin: T.px(13) +' 0 0 0',
        borderRadius: T.px(8),
        height: T.px(Styles.topMenu.height - 25),
        fontFamily: 'source-sans-pro, sans-serif',
        padding: T.px(0) + ' ' + T.px(5) +' 0 ' + T.px(50),
        fontSize: T.px(30),
        width: T.w() - T.p(110) + 'px',
        backgroundSize:  T.px(37) + ' ' + T.px(25)
    });
    T.updateStyle('#top-menu-search-input-empty', {
        margin: T.px(13) +' 0 0 0',
        height: T.px(Styles.topMenu.height - 25),
        left: T.w() - T.p(160) + 'px',
        width: T.px(50),
        backgroundSize:  T.px(50) + ' ' + T.px(29)
    });
    T.updateStyle('.search-wrapper', {
        top: T.px(Styles.topMenu.height),
        bottom: 0
    });
    if (!T.isIOS) {
        T.updateStyle('.search-wrapper', {
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch'
        });
    }
    T.updateStyle('.search-item', {
        width: T.w()+'px',
        borderBottom: T.px(1,1) + 'solid #aaa',
        padding: T.px(5) + ' ' + T.px(0) + ' ' + T.px(5) + ' ' + T.px(20),
        backgroundSize:  T.px(18) + ' ' + T.px(27),
        backgroundPosition:  T.w()- T.p(60) + 'px 50%'
    });
    T.updateStyle('.item-active', {
        backgroundColor: Styles.searchItem.bgColorHover
    });
    T.updateStyle('.search-item-image', {
        borderRadius: T.px(8),
        margin: T.px(5)+' '+T.px(5)+' '+T.px(5)+' '+T.px(0),
        width: T.px(100)
    });
    T.updateStyle('.search-item-image img', {
        height: T.px(100)
    });
    T.updateStyle('.search-item-text', {
        width: T.w() - T.p(200) + 'px',
        marginTop: T.px(10),
        marginLeft: T.px(10)
    });
    T.updateStyle('.search-item-title', {
        fontSize: T.px(36)
    });
    T.updateStyle('.search-item-description', {
        fontSize: T.px(30),
        lineHeight: T.px(50)
    });
    T.updateStyle('.search-noresults', {
        top: T.px(Styles.topMenu.height),
        bottom: 0
    });
    T.updateStyle('.search-noresults-title', {
        padding: T.px(100) +' 0 ' + T.px(40) + ' 0',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: T.px(48),
        color: '#373737'
    });
    T.updateStyle('.search-noresults-description', {
        width: T.w()+'px',
        padding: '0 ' + T.px(100),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center',
        fontSize: T.px(30),
        color: '#747372'
    });
    T.updateStyle('.search-cat-header', {
        height: T.px(100),
        fontSize: T.px(36),
        fontWeight: 'bold',
        lineHeight: T.px(100),
        padding: '0 0 0 ' + T.px(30),
        borderBottom: T.px(1,1) + ' solid #aaa'
    });
    T.updateStyle('.search-cat-image', {
        backgroundSize: T.px(48) + ' ' + T.px(48),
        width: T.px(80),
        height: T.px(90)
    });
    T.updateStyle('.search-cat-title', {
        fontSize: T.px(36),
        width: T.w() - T.p(170) + 'px',
        height: T.px(90)
    });
    T.updateStyle('.search-cat', {
        height: T.px(90),
        fontSize: T.px(36),
        fontWeight: 'normal',
        lineHeight: T.px(95),
        color: 'rgba(0,0,0,0.75)',
        borderBottom: T.px(1,1) + ' solid #aaa',
        padding: '0 0 0 ' + T.px(10),
        backgroundSize:  T.px(18) + ' ' + T.px(27),
        backgroundPosition:  T.w()- T.p(60) + 'px 50%'
    });
    T.updateStyle('.changecity-item', {
        width: T.w()+'px',
        borderBottom: T.px(1,1) + 'solid #aaa',
        padding: T.px(5) + ' ' + T.px(0) + ' ' + T.px(5) + ' ' + T.px(0)
    });
    T.updateStyle('.changecity-item-title', {
        marginLeft: T.px(20),
        lineHeight: T.px(90),
        fontSize: T.px(40)
    });
};