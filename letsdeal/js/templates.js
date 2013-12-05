
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
        return '<li onclick="App.addPage('+data.id+')"><div class="deallist-item" style="background-image: url('+data.imageSrc+');"><div>' +
            '<div class="deallist-item-header">'+data.title+'</div>' +
            '<div class="deallist-item-footer">' +
            '<div class="deallist-item-footer-bought">'+data.bulk+' köpta</div>' +
            '<div class="deallist-item-footer-price"><div class="deallist-item-footer-price-old">'+data.origPrice+' kr</div><div class="deallist-item-footer-price-new">'+data.price+' kr</div></div>' +
            '</div>' +
            '</div></div></li>';
    },
    dealsPageHeader: function(data){
        return '<a href="javascript:void(0)" id="header_'+data.id+'">'+data.name+' <span class="top-menu-tabs-counter">('+data.dealsCount+')</span></a>';
    },
    catDropdown: function(){
        return '<select class="categories-dropdown">' +
            '<option selected>Visar alla kategorier</option>' +
            '<option>Test 1 </option>' +
            '<option>Test 2 </option>' +
            '<option>Test 3 </option>' +
            '<option>Test 4 </option>' +
            '<option>Test 5 </option>' +
            '</select>';
    },
    prepareFooter: function(){
        T.setH('footer', T.p(Styles.footer.height, 1));
        T.updateStyle('#footer-tabs', {
            background: Styles.footer.bgColor,
            borderTop: Styles.footer.borderTop
        });
        T.updateStyle('#footer-tabs a', {
            paddingTop: T.px(Styles.footer.height - 2*Styles.footer.fontSize),
            fontSize: T.px(Styles.footer.fontSize),
            backgroundSize: T.px(48)+' '+ T.px(48),
            backgroundPosition: '50% '+ T.px(12)
        });

        T.byId('footer-tabs-search').innerHTML = Messages.searchDeal;
        T.byId('footer-tabs-mydeals').innerHTML = Messages.myDeals;
        T.byId('footer-tabs-city').innerHTML = Messages.changeCity;
        T.byId('footer-tabs-settings').innerHTML = Messages.settings;
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
            backgroundSize: T.px(62) + ' ' + T.px(80)
        });

        T.updateStyle('.top-menu-share-btn', {
            width: T.px(80),
            backgroundSize: T.px(80) + ' ' + T.px(80)
        });

        T.updateStyle('.top-menu-title', {
            width: T.w() - T.p(160) + 'px',
            lineHeight: T.p(Styles.topMenu.height) + 'px',
            color: Styles.topMenu.color,
            fontSize: T.p(Styles.topMenu.fontSize) + 'px',
            fontWeight: Styles.topMenu.fontWeight
        });

        T.query('#top-menu-wrapper li:nth-child(1)').className = 'top-menu-tabs-active';
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
        if (T.isIOS) {
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
        }
    },
    prepareHScroller: function(){
        T.setH('hscroller-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
        T.updateStyle('#hscroller-scroller', {
            top: T.px(Styles.topMenu.height),
            height: T.h()-T.p(Styles.topMenu.height + Styles.footer.height)+'px',
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

        T.updateStyle('.categories-dropdown', {
            width: T.w() - T.p(26) - (T.isDesktop?16:0) + 'px',
            'font-size': T.px(30),
            padding: '0 '+T.px(40)+' 0 '+T.px(20),
            margin: T.px(10)+' '+T.px(5)+' 0 '+T.px(15),
            'line-height': T.px(70),
            color: '#878787',
            border:  T.p(1,1)+'px solid '+'#d4d2cf',
            'border-radius':  T.px(2*window.devicePixelRatio,1),
            'background-size':  T.px(40)
        });

        App.mainPageHScroll = new IScroll(T.byId('hscroller-wrapper'), {
            scrollX: true,
            scrollY: 0,
            snap: true,
            momentum: false,
            bounce: false,
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
            App.mainPageHScroll.currentPageIndex = T.query('#hscroller-scroller-list > li:nth-child('+(App.mainPageHScroll.currentPage.pageX+1)+') > div').id;
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
            bottom: T.px(st.height),
            borderTop: T.px(2) + ' solid ' + Styles.hScroller.bgColor
        });

        //BOTTOM
        T.updateStyle('.dealinfo-bottom', {
            width: T.w()+'px',
            boxShadow: (!T.isAndroid2)? '0px -1px 1px 1px rgba(0,0,0,0.1)':'',
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
            marginRight: T.px(st.oldPrice.padding),
            width: T.px(25),
            height: T.px(25),
            backgroundSize: T.px(25) + ' ' + T.px(25),
            marginTop: T.px((st.height - st.firstLineHeight-24)/2 )
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
        T.updateStyle('.dealinfo-content-block', {
            border: T.px(1,1)+ ' solid #c6c6c6',
            background: 'white',
            boxShadow: (!T.isAndroid2)? '0px 1px 1px 1px rgba(0,0,0,0.05)':'',
            borderRadius: (!T.isAndroid2)? T.px(10,1):'',
            marginBottom: T.px(10),
            overflow: 'hidden'
        });
        T.updateStyle('.dealinfo-content-block-title', {
            borderBottom: T.px(1,1)+ ' solid #999',
            background: '#3eacc8',
            paddingLeft: T.px(10),
            height: T.px(65),
            lineHeight: T.px(65),
            color: 'white',
            fontSize: T.px(30)
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
        T.updateStyle('.dealinfo-content-map', {
            height:  T.px(400)
        });
    }
};