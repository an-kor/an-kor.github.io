
var Templates = {
    dealsPage: function(pageId){
        return '<div class="main-v-wrapper" id="wrapper_'+pageId+'">'+
            '<div class="deallist">'+
            '<ul id="deallist_'+pageId+'">'+
            '</ul>'+
            '</div>'+
            '</div>';
    },
    dealsItem: function(data){
        return '<li onclick="Deals.showDeal('+data.id+')"><div class="deallist-item" style="background-image: url('+data.imageSrc+');"><div>' +
            '<div class="deallist-item-header">'+data.title+'</div>' +
            '<div class="deallist-item-footer">' +
            '<div class="deallist-item-footer-bought">'+data.bulk+' köpta</div>' +
            '<div class="deallist-item-footer-price">'+((data.origPrice!=data.price)?'<div class="deallist-item-footer-price-old">'+ T.formatNumber(data.origPrice)+' kr</div>':'')+'<div class="deallist-item-footer-price-new">'+T.formatNumber(data.price)+' kr</div></div>' +
            '</div>' +
            '</div></div></li>';
    },
    dealsPageHeader: function(data){
        return '<a href="javascript:void(0)" id="header_'+data.id+'">'+data.name+' <span class="top-menu-tabs-counter">('+data.dealsCount+')</span></a>';
    },
    catDropdown: function(categories, callback){
        var select = document.createElement("select");
        select.className = "categories-dropdown";
        var option = document.createElement("option");
        option.value = "";
        option.selected = true;
        option.innerHTML = Messages.seeAllCategories;
        select.appendChild(option);
        for (var i in categories) {
            option = document.createElement("option");
            option.value = categories[i].id;
            option.innerHTML = categories[i].name;
            select.appendChild(option);
        }
        select.onchange = function(){
            callback(this.value);
        }
        return select;
    },
    prepareFooter: function(){
        T.updateStyle('#footer',{
            height: T.px(Styles.footer.height, 1),
            boxShadow: (!T.isAndroid2)? '0px 0px '+T.px(50)+' 1px rgba(0,0,0,0.3)':''
        });

        T.updateStyle('#footer-tabs', {
            background: Styles.footer.bgColor
            ,borderTop: T.px(2) + ' solid ' + Styles.footer.borderTop
        });
        T.updateStyle('#footer-tabs a', {
            height: T.px(Styles.footer.height, 1),
            fontSize: T.px(Styles.footer.fontSize),
            backgroundSize: T.px(48)+' '+ T.px(48),
            backgroundPosition: '50% '+ T.px(12)
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

        /*T.byId('footer-tabs-search').innerHTML = Messages.searchDeal;
        T.byId('footer-tabs-mydeals').innerHTML = Messages.myDeals;
        T.byId('footer-tabs-city').innerHTML = Messages.changeCity;
        T.byId('footer-tabs-settings').innerHTML = Messages.settings;*/
        T.initHover(T.query('#footer-tabs li'), Styles.footer.bgColorHover);
    },
    prepareHeader: function(){
        if (T.p(Styles.topMenu.fontSize)>T.w()/17) {
            Styles.topMenu.fontSize = T.w()/T.p(17.5);
            Styles.topMenu.height = Styles.topMenu.fontSize*2;
        }

        T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));

        T.updateStyle('#top-menu-background', {
            height: T.p(Styles.topMenu.height) + 'px',
            background: Styles.topMenu.bgColor
        });

        var trHeight = Math.ceil(T.p(Styles.topMenu.height)/5.66);
        T.updateStyle('#top-menu-triangle', {
            height: trHeight + 'px',
            top:  T.p(Styles.topMenu.height) - trHeight + 'px'
        });

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
            background: Styles.topMenu.bgColor,
            fontSize: T.px(Styles.topMenu.fontSize),
            fontWeight: Styles.topMenu.fontWeight,
            lineHeight: T.px(Styles.topMenu.height)
        });

        T.updateStyle('#top-menu-wrapper li a', {
            color: Styles.topMenu.color
        });

        T.updateStyle('.top-menu-back-btn', {
            width: T.px(80),
            borderRight: T.px(1,1)+ ' solid rgba(0,0,0,0.1)',
            backgroundSize: T.px(24) + ' ' + T.px(42)
        });
        T.updateStyle('.search-page .top-menu-back-btn', {
            borderRight: 0
        });

        T.updateStyle('.top-menu-share-btn', {
            width: T.px(110),
            borderLeft: T.px(1,1)+ ' solid rgba(255,255,255,0.2)',
            backgroundSize: T.px(80) + ' ' + T.px(80),
            lineHeight: T.px(Styles.topMenu.height),
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
            width: T.w() - T.p(80) + 'px',
            borderLeft: T.px(1,1)+ ' solid rgba(255,255,255,0.2)',
            paddingLeft: T.px(20),
            lineHeight: T.px(Styles.topMenu.height),
            color: Styles.topMenu.color,
            fontSize: T.px(Styles.topMenu.fontSize),
            fontWeight: Styles.topMenu.fontWeight
        });

        T.updateStyle('.deal-page .top-menu-title', {
            width: T.w() - T.p(190) + 'px',
            borderRight: T.px(1,1)+ ' solid rgba(0,0,0,0.1)',
            borderLeft: T.px(1,1)+ ' solid rgba(255,255,255,0.2)',
            backgroundSize: 'contain'
        });

        T.query('#top-menu-wrapper li:nth-child(1)').className = 'top-menu-tabs-active';

        T.updateStyle('.iframe-wrapper', {
            top: T.px(Styles.topMenu.height),
            bottom: 0
        });
    },
    prepareSearch: function(){
        T.updateStyle('.top-menu-search', {
            width: T.w() - T.p(60) + 'px'
        });
        T.updateStyle('.top-menu-search input', {
            margin: T.px(13) +' 0 0 0',
            borderRadius: T.px(8),
            height: T.px(Styles.topMenu.height - 25),
            fontFamily: 'source-sans-pro, sans-serif',
            padding: T.px(0) + ' ' + T.px(5) +' 0 ' + T.px(50),
            fontSize: T.px(35),
            width: T.w() - T.p(100) + 'px',
            backgroundSize:  T.px(37) + ' ' + T.px(25)
        });
        T.updateStyle('#top-menu-search-input-empty', {
            margin: T.px(13) +' 0 0 0',
            height: T.px(Styles.topMenu.height - 25),
            right: T.px(35),
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
            margin: T.px(5) + ' 0 '+T.px(5)+' '+T.px(10),
            width: T.px(70)
        });
        T.updateStyle('.search-item-image img', {
            height: T.px(70)
        });
        T.updateStyle('.search-item-text', {
            width: T.w() - T.p(200) + 'px',
            marginLeft: T.px(20)
        });
        T.updateStyle('.search-item-title', {
            fontSize: T.px(30)
        });
        T.updateStyle('.search-item-description', {
            fontSize: T.px(28)
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
            padding: '0 0 0 ' + T.px(80),
            borderBottom: T.px(1,1) + ' solid #aaa'
        });
        T.updateStyle('.search-cat-image', {
            backgroundPosition:  T.p(60) + 'px 50%',
            backgroundSize: T.px(48) + ' ' + T.px(48),
            width: T.px(120),
            height: T.px(90)
        });
        T.updateStyle('.search-cat-title', {
            width: T.w() - T.p(300) + 'px'
        });
        T.updateStyle('.search-cat', {
            height: T.px(90),
            fontSize: T.px(36),
            fontWeight: 'normal',
            lineHeight: T.px(95),
            color: 'rgba(0,0,0,0.75)',
            borderBottom: T.px(1,1) + ' solid #aaa',
            padding: '0 0 0 ' + T.px(20),
            backgroundSize:  T.px(18) + ' ' + T.px(27),
            backgroundPosition:  T.w()- T.p(60) + 'px 50%'
        });

        T.updateStyle('.changecity-item', {
            width: T.w()+'px',
            borderBottom: T.px(1,1) + 'solid #aaa',
            padding: T.px(5) + ' ' + T.px(0) + ' ' + T.px(5) + ' ' + T.px(20)
        });
        T.updateStyle('.changecity-item-title', {
            marginLeft: T.px(60),
            lineHeight: T.px(90),
            fontSize: T.px(40)
        });

    },

    prepareSplash: function(){
        T.updateStyle('#splash', {
            'background-size':  T.p(559)+'px '+ T.px(359),
            'background-position':  '50% '+ T.px(150)
        });
        T.updateStyle('#splash-loading', {
            top:  T.px(640),
            height: T.px(60),
            'background-size':  T.px(60)
        });
        T.updateStyle('#splash-message', {
            top:  T.px(720),
            'font-size':  T.px(30)
        });
        T.byId('splash-message').innerHTML = Messages.loadingDeals;
        T.byId('splash').style.display = 'block';
        /*if (T.isIOS) {
            var intTime = new Date().getTime();
            var getTime = function() {
                var intNow = new Date().getTime();
                if (intNow - intTime > 3000) {
                    T.byId('splash').style.display = 'block';
                    setTimeout(function(){
                        T.byId('splash').style.display = 'none';
                    },1000)
                }
                intTime = intNow;
                setTimeout(getTime,500);
            };
            getTime();
        }*/
    },
    prepareHScroller: function(){
        T.setH('hscroller-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
        T.updateStyle('#hscroller-scroller', {
            top: T.px(Styles.topMenu.height),
            height: T.h()-T.p(Styles.topMenu.height + Styles.footer.height, 1)+1+'px',
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

        App.mainPageHScroll = new IScroll(T.byId('hscroller-wrapper'), {
            scrollX: true,
            scrollY: 0,
            snap: true,
            momentum: false,
            //bounce: false,
            snapThreshold: 0.1,
            lockDirection: true,
            directionLockThreshold: 20,
            eventPassthrough: 'vertical',
            preventDefault: true,
            indicators: [{
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
        });
        App.mainPageHScroll.scrollActive = 0;
        App.mainPageHScroll.on('scrollStart', function(){
            App.mainPageHScroll.scrollActive = 1;
        });
        App.mainPageHScroll.on('scrollEnd', function(){
            App.mainPageHScroll.scrollActive = 0;
        });
    },
    prepareDeals: function(){
        var k = T.p(350) / 290, wk = k, itemWidth = 510, scrollWidth = 0;
        if (T.isDesktop) {
            scrollWidth = 8
        }
        if ((T.w() > 600 && !T.isAndroid) || (Math.abs(window.orientation) == 90)) {
            k = (T.w()/2 - T.p(21.5)) / itemWidth;
            if (wk < k) {
                wk = k;
            }
        } else {
            if (k * itemWidth < (T.w() - T.p(30))) {
                k = (T.w() - T.p(30)) / itemWidth;
                wk = k;
            } else {
                k = (T.w() - T.p(30)) / itemWidth;
            }
        }

        T.updateStyle('.deallist-item', {
            margin: T.p(10) + 'px 0 0 ' + T.p(15, 1) + 'px',
            height: T.p(400) + 'px',
            width: (k * itemWidth) - scrollWidth + 'px',
            border: '1px solid white',
            boxShadow: (!T.isAndroid2)? '0px 1px 1px 1px rgba(204,202,197,1)':'',
            borderRadius: (!T.isAndroid2)? T.px(2*window.devicePixelRatio,1):'',
            webkitBackgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundPosition: '0px ' + (T.p(340) - wk * 290) + 'px'
        });

        T.updateStyle('.deallist-item-header', {
            background: 'rgba(0,0,0,0.6)',
            height: T.px(50),
            paddingLeft: T.px(15),
            lineHeight: T.px(50),
            color: 'white',
            fontSize: T.px(24)
            ,textShadow: (!T.isAndroid2)?'0px 1px 2px rgba(0, 0, 0, 0.5)':''
        });
        T.updateStyle('.deallist-item-footer', {
            marginTop: T.px(290),
            borderTop: 1+'px solid #cccac5',
            height: T.px(60)
        });
        T.updateStyle('.deallist-item-footer-bought', {
            width: T.p(130) + 'px',
            background: '#edebe6',
            fontWeight: 'bold',
            color: '#545351',
            textAlign: 'center',
            fontSize: T.px(21)
            ,lineHeight: T.px(60)
        });
        T.updateStyle('.deallist-item-footer-price', {
            width: (k * 510) - T.p(140) - (T.isDesktop?16:0) + 'px',
            lineHeight: T.px(60)
        });
        T.updateStyle('.deallist-item-footer-price-new', {
            color: '#d72e1e',
            fontWeight: 'bold',
            margin: '0 ' + T.px(10),
            fontSize: T.px(38)
            ,lineHeight: T.px(60)
        });
        T.updateStyle('.deallist-item-footer-price-old', {
            color: '#8f8f8f',
            fontSize: T.px(24),
            textDecoration: 'line-through'
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
            width: T.w() - T.p(26) - (T.isDesktop?16:0) + 'px',
            fontSize: T.px(30),
            padding: '0 '+T.px(40)+' 0 '+T.px(20),
            margin: T.px(10)+' '+T.px(5)+' 0 '+T.px(15),
            lineHeight: T.px(70),
            color: '#878787',
            border:  T.p(1,1)+'px solid '+'#d4d2cf',
            borderRadius:  T.px(2*window.devicePixelRatio,1),
            backgroundSize:  T.px(40)
        });

    },
    preparePages: function(){
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
    },
    prepareDealInfo: function(){
        var st = Styles.dealInfo.bottom;
        T.updateStyle('.dealinfo-wrapper', {
            top: T.px(Styles.topMenu.height),
            bottom: T.px(st.height)
            //borderTop: T.px(2) + ' solid ' + Styles.hScroller.bgColor
        });
        if (!T.isIOS) {
            T.updateStyle('.dealinfo-wrapper', {
                overflowY: 'scroll',
                webkitOverflowScrolling: 'touch'
            });
        }

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
            textDecoration: 'line-through',
            color: st.oldPrice.color
        });
        T.updateStyle('.dealinfo-bottom-price-new', {
            paddingLeft: T.px(st.newPrice.padding),
            fontSize: T.px(st.newPrice.fontSize),
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
            backgroundColor: st.buyBtn.bgColor,
            fontSize: T.px(st.buyBtn.fontSize),
            lineHeight: T.px(st.buyBtn.height+5),
            fontWeight: st.buyBtn.fontWeight,
            textTransform: 'uppercase'
            //,marginLeft: 'auto'
        });
        T.updateStyle('.dealinfo-bottom-bought', {
            paddingLeft: T.px(st.oldPrice.padding),
            fontSize: T.px(st.bought.fontSize),
            color: st.bought.color
        });
        T.updateStyle('.dealinfo-bottom-countdown', {
            paddingRight: T.px(st.newPrice.padding),
            fontSize: T.px(st.countdown.fontSize),
            color: st.countdown.color
        });
        T.updateStyle('.dealinfo-bottom-infoIcon', {
            width: T.px(60),
            height: T.px(55),
            backgroundSize: T.px(25) + ' ' + T.px(25)
        });

        //CONTENT 640x430
        var imgHeight = (T.w()/510)*290;
        if (imgHeight > T.h()/2.5) {
            imgHeight = T.h()/2.5
        }

        var st = Styles.dealInfo.content;
        T.updateStyle('.dealinfo-content-image', {
            width: T.w(),
            height: imgHeight+'px'
        });
        /*if (T.w()/510>3) {
            T.updateStyle('.dealinfo-content-image', {
                webkitFilter: 'blur('+ T.px(3)+')'
            });
        }*/
        T.updateStyle('.dealinfo-content-wrapper', {
            padding: T.px(10) + ' ' + T.px(20)
        });
        T.updateStyle('.dealinfo-content-title', {
            color: st.title.color,
            lineHeight: st.title.lineHeight,
            fontFamily: st.title.fontFamily,
            fontSize: T.px(st.title.fontSize),
            fontWeight: st.title.fontWeight,
            paddingBottom: T.px(st.title.paddingBottom)
        });

        T.updateStyle('.content-loading', {
            height: T.px(48),
            backgroundSize: 'contain'
        });
        T.updateStyle('.dealinfo-content-block', {
            border: T.px(1,1)+ ' solid #c6c6c6',
            background: 'white',
            boxShadow: (!T.isAndroid2)? '0px 1px '+T.px(1,1)+' '+T.px(1,1)+' rgba(0,0,0,0.05)':'',
            borderRadius: (!T.isAndroid2)? T.px(10,1):'',
            marginBottom: T.px(10),
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
            borderBottom: T.px(1,1)+ ' solid #aaa9a4',
            background: '#3eacc8',
            paddingLeft: T.px(15),
            height: T.px(65),
            lineHeight: T.px(65),
            color: 'white',
            fontSize: T.px(30),
            overflow: 'hidden'
        });
        T.updateStyle('.dealinfo-content-block h5', {
            paddingTop: T.px(5),
            fontSize: T.px(25)
        });

        T.updateStyle('.dealinfo-content-block-content', {
            padding: T.px(15) + ' ' + T.px(25),
            color: '#5b5b59',
            fontSize: T.px(22)
        });
        T.updateStyle('.dealinfo-content-contacts', {
            padding: '0 ' + T.px(10),
            color: '#5b5b59',
            fontSize: T.px(22)
        });
        T.updateStyle('.dealinfo-content-contacts h5', {
            fontSize: T.px(28),
            color: '#333',
            paddingTop: T.px(10)
        });
        T.updateStyle('.dealinfo-content-contacts h5 strong', {
            fontWeight: 'normal'
        });

        T.updateStyle('.dealinfo-share', {
            backgroundColor: T.isAndroid ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.75)"
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


    }
};