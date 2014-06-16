Templates.prepareDeals = function(){
    if (!T.isIOS) {
        T.updateStyle('.main-v-wrapper', {
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch'
        });
    }
    var scrollWidth = 0, backgroundSize, is2Columns = false;
    if (T.isDesktop) {
        scrollWidth = 8 / ((window.outerWidth - 8) / window.innerWidth)
    }
    var itemWidth = T.w() - T.p(30);
    if ((T.w() > 800 && T.isDesktop) || (T.isIOS && Math.abs(window.orientation) == 90)) {
        is2Columns = true;
        itemWidth = T.w()/2 - T.p(21.5);
    }
    T.is2Columns = is2Columns;
    var itemHeight = 290 / (510 / itemWidth);
    if (itemWidth / itemHeight < 510 / 290) {
        backgroundSize = 'auto ' + itemHeight + 'px'
    } else {
        backgroundSize = itemWidth + 'px auto'
    }
    T.updateStyle('.deallist-item', {
        margin: T.p(22) + 'px 0 0 ' + T.p(15, 1) + 'px',
        height: itemHeight + T.px(50) + 'px',
        width: itemWidth - scrollWidth + 'px',
        border: T.px(1,1) + ' solid white',
        boxShadow: (!T.isAndroid2)? '0px 1px 1px 1px rgba(204,202,197,0.75)':'',
        borderRadius: (!T.isAndroid2)? T.px(2,1):'',
        webkitBackgroundSize: itemWidth + 'px ' + itemHeight + 'px',
        backgroundSize: backgroundSize,
        backgroundPosition: '50% 0'
    });
    var shadowHeight = itemHeight / 3;
    T.updateStyle('.deallist-item-header', {
        //background: 'rgba(0,0,0,0.6)',
        height: T.p(50) + shadowHeight+'px',
        paddingLeft: T.px(15),
        paddingTop: shadowHeight+'px',
        backgroundSize: '1px '+ (T.p(50) + shadowHeight + 10) + 'px',
        lineHeight: T.px(50),
        color: 'white',
        marginTop: itemHeight - (T.p(50) + shadowHeight)+ 'px',
        fontSize: (!is2Columns)?T.px(36) : T.px(30)
        ,textShadow: (!T.isAndroid2)?'0px 1px 2px rgba(0, 0, 0, 0.5)':''
    });
    T.updateStyle('.deallist-item-footer', {
        //boxShadow: (!T.isAndroid2)? '0 0 '+shadowHeight+'px '+ itemHeight/6+'px rgba(0,0,0,'+shadowAlpha+')':'',
        borderTop: 1+'px solid #cccac5',
        height: T.px(60)
    });
    T.updateStyle('.deallist-item-without-timer', {
        marginLeft: T.px(50)
    });
    T.updateStyle('.deallist-item-footer-bought', {
        width: T.p(140) + 'px',
        background: '#edebe6',
        //fontWeight: 'bold',
        color: '#545351',
        textAlign: 'center',
        fontFamily: 'source-sans-pro',
        fontSize: (!is2Columns)?T.px(26) : T.px(22)
        ,lineHeight: (!is2Columns)? T.px(65) : T.px(60)
    });
    T.updateStyle('.deallist-item-footer-timer', {
        width: T.p(140) + 'px',
        marginLeft: T.px(3),
        paddingLeft: T.px(25),
        backgroundColor: '#edebe6',
        backgroundSize: (!is2Columns)? T.px(20) : T.px(20),
        backgroundPosition: T.px(12) + ' ' + T.px(21.5),
        color: '#545351',
        textAlign: 'center',
        fontFamily: 'source-sans-pro',
        fontSize: (!is2Columns)?T.px(26) : T.px(22)
        ,lineHeight: (!is2Columns)? T.px(65) : T.px(60)
    });
    T.updateStyle('.deallist-item-footer-price', {
        //width: itemWidth - T.p(320) - (T.isDesktop?16:0) + 'px',
        'float': 'right',
        marginRight: T.px(20),
        lineHeight: T.px(60)
    });
    T.updateStyle('.deallist-item-footer-price-new', {
        color: '#d72e1e',
        fontWeight: 'bold',
        fontFamily: 'source-sans-pro',
        margin: '0 0 0 ' + T.px(5),
        fontSize: (!is2Columns)?T.px(45) : T.px(30)
        ,lineHeight: T.px(60)
    });
    T.updateStyle('.deallist-item-footer-price-old', {
        color: '#8f8f8f',
        fontSize: (!is2Columns)?T.px(26) : T.px(22),
        fontFamily: 'source-sans-pro',
        textDecoration: 'line-through'
        ,lineHeight: (!is2Columns)? T.px(65) : T.px(60)
    });
    T.updateStyle('.deallist > ul', {
        paddingBottom: T.px(80)
    });
    T.updateStyle('.loading-icon', {
        bottom: T.px(10),
        height: T.px(50),
        webkitBackgroundSize: T.px(48) + ' ' + T.px(48),
        backgroundSize: T.px(48) + ' ' + T.px(48)
    });
    T.updateStyle('.categories-dropdown', {
        width: T.w() - T.p(28) - (T.isDesktop?16:0) + 'px',
        fontSize: T.px(30),
        fontWeight: 'lighter',
        padding: '0 '+T.px(40)+' 0 '+T.px(20),
        margin: T.px(Styles.topMenu.height + 18)+' '+T.px(5)+' 0 '+T.px(15),
        lineHeight: T.px(70),
        color: '#555',
        border:  T.p(1)+'px solid '+'#d4d2cf',
        borderRadius: (!T.isAndroid2)? T.px(2,1):'',
        backgroundSize:  T.px(40),
        boxShadow: (!T.isAndroid2)? '0px 1px 1px 1px rgba(204,202,197,0.75)':''
    });

};