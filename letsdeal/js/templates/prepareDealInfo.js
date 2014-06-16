Templates.prepareDealInfo = function(){
    var st = Styles.dealInfo.bottom;
    T.updateStyle('.dealinfo-wrapper', {
        //top: T.px(Styles.topMenu.height),
        top: 0,
        bottom: T.px(st.height)
        //borderTop: T.px(2) + ' solid ' + Styles.hScroller.bgColor
    });
    T.updateStyle('.dealinfo-content-padding', {
        height: T.px(Styles.topMenu.height)
    });

    /*
    // dealinfo scroller for desktop and android
    if (!T.isIOS) {
        T.updateStyle('.dealinfo-wrapper', {
            overflowY: 'scroll',
            webkitOverflowScrolling: 'touch'
        });
    }
    */

    //BOTTOM
    T.updateStyle('.dealinfo-bottom', {
        width: T.w()+'px',
        boxShadow: (!T.isAndroid2)? '0px 0px '+T.px(50)+' 0px rgba(0,0,0,0.25)':'',
        bottom: 0
    });
    T.updateStyle('.dealinfo-bottom-firstline', {
        height: T.px(st.firstLineHeight),
        lineHeight: T.px(st.firstLineHeight+5),
        backgroundColor: st.firstLineBgColor
    });
    T.updateStyle('.dealinfo-bottom-secondline', {
        height: T.px(st.height - st.firstLineHeight),
        lineHeight: T.px(st.height - st.firstLineHeight+5),
        backgroundColor: st.secondLineBgColor
    });
    T.updateStyle('.dealinfo-bottom-price-old', {
        paddingLeft: T.px(st.oldPrice.padding),
        fontSize: T.px(st.oldPrice.fontSize),
        paddingTop: T.px(st.oldPrice.fontSize/5),
        fontFamily: st.newPrice.fontFamily,
        textDecoration: 'line-through',
        color: st.oldPrice.color
    });
    T.updateStyle('.dealinfo-bottom-price-new', {
        paddingLeft: T.px(st.newPrice.padding),
        fontSize: T.px(st.newPrice.fontSize),
        fontFamily: st.newPrice.fontFamily,
        fontWeight: st.newPrice.fontWeight,
        color: st.newPrice.color
    });
    T.updateStyle('.dealinfo-bottom-buyBtn', {
        marginTop: T.px((st.firstLineHeight - st.buyBtn.height) /2),
        marginRight: T.px(st.oldPrice.padding),
        width: T.px(st.buyBtn.width),
        height: T.px(st.buyBtn.height),
        color: st.buyBtn.color,
        borderRadius: T.p(st.buyBtn.borderRadius)+'px',
        textAlign: 'center',
        background: '-webkit-linear-gradient(top, '+st.buyBtn.bgColorLight+' 0%, '+st.buyBtn.bgColor+' 100%)',
        //backgroundColor: st.buyBtn.bgColor,
        fontSize: T.px(st.buyBtn.fontSize),
        lineHeight: T.px(st.buyBtn.height+5),
        fontWeight: st.buyBtn.fontWeight,
        textTransform: 'uppercase',
        boxShadow: (!T.isAndroid2)? 'inset 0 '+T.px(-4)+' '+ T.px(1)+' '+ T.px(1)+' #339a3c':''
        //,marginLeft: 'auto'
    });
    T.updateStyle('.dealinfo-bottom-buyBtn-soldOut', {
        fontSize: T.px(st.buyBtn.fontSize-6),
        background: '#b5b5b5',
        boxShadow: (!T.isAndroid2)? 'inset 0 '+T.px(-4)+' '+ T.px(1)+' '+ T.px(1)+' #a9a9a9':''
    });
    T.updateStyle('.dealinfo-bottom-bought', {
        paddingLeft: T.px(st.oldPrice.padding),
        fontSize: T.px(st.bought.fontSize),
        fontFamily: st.newPrice.fontFamily,
        color: st.bought.color
    });
    T.updateStyle('.dealinfo-bottom-countdown', {
        paddingRight: T.px(st.newPrice.padding),
        fontSize: T.px(st.countdown.fontSize),
        fontFamily: st.newPrice.fontFamily,
        color: st.countdown.color
    });
    T.updateStyle('.dealinfo-bottom-infoIcon', {
        width: T.px(60),
        height: T.px(60),
        backgroundSize: T.px(25) + ' ' + T.px(25)
    });

    var pageWidth = T.w();
    if (T.h() < T.w()) {
        pageWidth = T.h();

        T.updateStyle('.dealinfo-content', {
            padding: '0 '+ (T.w() - pageWidth)/2+'px'
        });

        T.updateStyle('.dealinfo-content-wrapper', {
            padding: T.px(10) + ' ' + T.px(0),
            background: '#edebe6'
        });
    } else {
        T.updateStyle('.dealinfo-content-wrapper', {
            padding: T.px(10) + ' ' + T.px(20),
            background: '#edebe6'
        });
    }

    var imgHeight = (pageWidth/510)*290;

    st = Styles.dealInfo.content;
    T.updateStyle('.dealinfo-content-image', {
        width: pageWidth+'px',
        height: imgHeight+'px'
    });
    /*if (T.w()/510>2) {
        T.updateStyle('.dealinfo-content-image', {
            webkitFilter: 'blur('+ T.px(3)+')'
        });
    }*/
    T.updateStyle('.dealinfo-content-title', {
        color: st.title.color,
        lineHeight: st.title.lineHeight,
        fontFamily: st.title.fontFamily,
        fontSize: T.px(st.title.fontSize),
        fontWeight: st.title.fontWeight,
        paddingTop: T.px(st.title.paddingTop),
        paddingBottom: T.px(st.title.paddingBottom)
    });
    T.updateStyle('.content-loading', {
        height: T.px(48),
        backgroundSize: 'contain'
    });
    T.updateStyle('.dealinfo-content-block', {
        // font: '-apple-system-body',
        border: T.px(1)+ ' solid #c6c6c6',
        background: 'white',
        boxShadow: (!T.isAndroid2)? '0px 1px '+T.px(1,1)+' '+T.px(1,1)+' rgba(0,0,0,0.05)':'',
        borderRadius: (!T.isAndroid2)? T.px(4,1):'',
        marginBottom: T.px(30),
        overflow: 'hidden'
    });
    T.updateStyle('.dealinfo-content-map', {
        height:  T.px(400),
        border: T.px(1,1)+ ' solid #c6c6c6',
        boxShadow: (!T.isAndroid2)? '0px 1px '+T.px(1,1)+' '+T.px(1,1)+' rgba(0,0,0,0.05)':'',
        marginBottom: T.px(10),
        overflow: 'hidden'
    });
    T.updateStyle('.dealinfo-content-block-title', {
        background: '#3eacc8',
        paddingLeft: T.px(15),
        height: T.px(65),
        lineHeight: T.px(65),
        color: 'white',
        fontSize: T.px(36),
        fontWeight: 'bold',
        overflow: 'hidden'

    });
    T.updateStyle('.dealinfo-content-block h5', {
        paddingTop: T.px(5),
        fontWeight: 'bold',
        fontSize: T.px(30)
    });
    T.updateStyle('.dealinfo-content-block h5 > strong', {
        display: 'block',
        marginTop: T.px(40),
        fontSize: T.px(30),
        fontWeight: 'bold',
        color: '#333333'
    });
    T.updateStyle('.dealinfo-content-block p', {
        paddingTop: T.px(10)
    });

    T.updateStyle('.dealinfo-content-block-content', {
        padding: T.px(10) + ' ' + T.px(25) + ' ' + T.px(25)+ ' ' + T.px(25),
        color: '#555',
        fontSize: T.px(30),
        lineHeight: 1.3
    });
    T.updateStyle('.dealinfo-content-contacts', {
        padding: '0 ' + T.px(10),
        color: '#555',
        fontSize: T.px(30)
    });
    T.updateStyle('.dealinfo-content-contacts h5', {
        fontSize: T.px(30),
        color: '#333',
        paddingTop: T.px(10)
    });
    T.updateStyle('.dealinfo-content-contacts h5 strong', {
        fontWeight: 'normal'
    });

    T.updateStyle('.dealinfo-share', {
        backgroundColor: T.isIOS ? "rgba(27,71,81,0.33)" : "rgba(0,0,0,0.75)"
    });
    T.updateStyle('.dealinfo-share-block div, .dealinfo-share-block a', {
        height: T.px(80),
        lineHeight: T.px(80)
    });
    T.updateStyle('.dealinfo-share-block', {
        width: T.w() - T.p(20)*2,
        margin: T.px(20),
        borderRadius: T.px(5)
    });
    T.updateStyle('.dealinfo-share-block-title', {
        fontSize: T.px(25)
    });
    T.updateStyle('.dealinfo-share-item', {
        fontSize: T.px(35)
    });
};