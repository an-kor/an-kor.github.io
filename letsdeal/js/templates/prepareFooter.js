Templates.prepareFooter = function(){
    T.updateStyle('#footer',{
        height: T.px(Styles.footer.height, 1),
        boxShadow: (!T.isAndroid2)? '0px 0px '+T.px(50)+' 1px rgba(0,0,0,0.4)':''
    });
    T.updateStyle('#footer-tabs', {
        background: Styles.footer.bgColor
        ,borderTop: T.px(1,1) + ' solid ' + Styles.footer.borderTop
    });
    T.updateStyle('#footer-tabs a', {
        height: T.px(Styles.footer.height, 1),
        fontSize: T.px(Styles.footer.fontSize),
        backgroundSize: T.px(52)+' '+ T.px(52),
        backgroundPosition: '50% '+ T.px(18)
    });
    T.updateStyle('#footer-tabs-search', {
        borderRight: T.px(1,1) + ' solid ' + Styles.footer.borderColor1
    });
    T.updateStyle('#footer-tabs-mydeals', {
        borderRight: T.px(1,1) + ' solid ' + Styles.footer.borderColor1
    });
    T.updateStyle('#footer-tabs-mydeals', {
        borderLeft: T.px(1,1) + ' solid ' + Styles.footer.borderColor2
    });
    T.updateStyle('#footer-tabs-city', {
        borderLeft: T.px(1,1) + ' solid ' + Styles.footer.borderColor2
    });
    T.initHover(T.query('#footer-tabs li'), Styles.footer.bgColorHover);
};