
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
        return '<li><div class="deallist-item" style="background-image: url('+data.imageSrc+');"><div>' +
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
    catDropdown: function(pageId){
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
            paddingTop: T.p(Styles.footer.height - 2*Styles.footer.fontSize) + 'px',
            fontSize: T.p(Styles.footer.fontSize) + 'px',
            backgroundSize: T.p(48)+'px '+ T.p(48) +'px',
            backgroundPosition: '50% '+ T.p(12) +'px'
        });
    },
    prepareHeader: function(){
        if (T.p(Styles.topMenu.fontSize)>T.w()/17) {
            Styles.topMenu.fontSize = T.w()/T.p(17.5);
            Styles.topMenu.height = Styles.topMenu.fontSize*2;
        }

        T.setH('top-menu-wrapper', T.p(Styles.topMenu.height));

        T.updateStyle('#top-menu-background', {
            height: T.p(Styles.topMenu.height) + 'px',
            background: Styles.topMenu.bgColor,
            borderBottom: Styles.topMenu.borderBottom
        });

        var trHeight = Math.ceil(T.p(Styles.topMenu.height)/5.66);
        T.updateStyle('#top-menu-triangle', {
            height: trHeight + 'px',
            top:  - trHeight + 'px'
        });

        T.updateStyle('#top-menu-wrapper', {
            width: T.w() + 'px'
        });

        T.updateStyle('#top-menu-wrapper ul', {
            width: T.w()*Styles.numberOfPages + 'px',
            paddingLeft: (T.w() - (T.w()/2))/2 + 'px'
        });

        T.updateStyle('#top-menu-wrapper li', {
            width: T.w()/2 + 'px',
            height: T.p(Styles.topMenu.height)-2 + 'px',
            background: Styles.topMenu.bgColor,
            fontSize: T.p(Styles.topMenu.fontSize) + 'px',
            fontWeight: Styles.topMenu.fontWeight
        });

        T.updateStyle('#top-menu-wrapper li a', {
            lineHeight: T.p(Styles.topMenu.height) + 'px',
            color: Styles.topMenu.color
        });
        T.query('#top-menu-wrapper li:nth-child(1)').className = 'top-menu-tabs-active';
    },

    prepareSplash: function(){
        T.updateStyle('#splash', {
            'background-size':  T.p(559)+'px '+ T.p(359)+'px',
            'background-position':  '50% '+ T.p(150)+'px'
        });
        T.updateStyle('#splash-loading', {
            top:  T.p(640)+'px',
            height: T.p(60)+'px',
            'background-size':  T.p(60)+'px'
        });
        T.updateStyle('#splash-message', {
            top:  T.p(720)+'px',
            'font-size':  T.p(30)+'px'
        });
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
    prepareMainPage: function(){
        T.setH('main-page-wrapper', T.h() - T.p(Styles.footer.height, 1)+1);
        T.updateStyle('#main-page-scroller', {
            top: T.p(Styles.topMenu.height) + 'px',
            width: T.w()*Styles.numberOfPages + 'px'
        });
        T.updateStyle('#main-page-scroller-background', {
            backgroundSize: '1px ' + T.p(65) + 'px',
            height: T.p(64) + 'px',
            top: T.h() - T.p(Styles.topMenu.height+Styles.footer.height+60) + 'px'
        });
        T.updateStyle('#main-page-scroller-list', {
            backgroundSize: '1px ' + T.p(64) + 'px'
        });
        T.updateStyle('#main-page-scroller-list > li', 'width', T.w() + 'px');

        T.updateStyle('.categories-dropdown', {
            width: T.w() - T.p(26) - (T.isDesktop?16:0) + 'px',
            'font-size': T.p(30)+'px',
            padding: '0 '+T.p(40)+'px 0 '+T.p(20)+'px',
            margin: T.p(10)+'px '+T.p(5)+'px 0 '+T.p(15)+'px',
            'line-height': T.p(70)+'px',
            color: '#878787',
            border:  T.p(1,1)+'px solid '+'#d4d2cf',
            'border-radius':  T.p(2*window.devicePixelRatio,1)+'px',
            'background-size':  T.p(40)+'px'
        });
        App.mainPageHScroll = new IScroll(T.byId('main-page-wrapper'), {
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
        App.mainPageHScroll.on('translate', function(){
            T.query('#top-menu-wrapper li.top-menu-tabs-active').className = '';
            T.query('#top-menu-wrapper li:nth-child('+(this.currentPage.pageX+1)+')').className = 'top-menu-tabs-active';
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
            borderRadius: (!T.isAndroid2)? T.p(2*window.devicePixelRatio,1)+'px':'',
            webkitBackgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundSize: (wk * itemWidth) + 'px ' + wk * 290 + 'px',
            backgroundPosition: '0px ' + (T.p(340) - wk * 290) + 'px'
        });

        T.updateStyle('.deallist-item-header', {
            background: 'rgba(0,0,0,0.6)',
            height: T.p(50)+'px',
            paddingLeft: T.p(15)+'px',
            lineHeight: T.p(50)+'px',
            color: 'white',
            fontSize: T.p(24)+'px'
            ,textShadow: (!T.isAndroid2)?'0px 1px 2px rgba(0, 0, 0, 0.5)':''
        });
        T.updateStyle('.deallist-item-footer', {
            marginTop: T.p(290) +'px',
            borderTop: 1+'px solid #cccac5',
            height: T.p(60) - 2 +'px'
        });
        T.updateStyle('.deallist-item-footer-bought', {
            width: T.p(130) + 'px',
            background: '#edebe6',
            fontWeight: 'bold',
            color: '#545351',
            textAlign: 'center',
            fontSize: T.p(21)+'px'
            ,lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price', {
            width: (k * 510) - T.p(140) + 'px',
            lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price-new', {
            color: '#d72e1e',
            fontWeight: 'bold',
            margin: '0 ' + T.p(10)+'px',
            fontSize: T.p(38)+'px'
            ,lineHeight: T.p(60)+'px'
        });
        T.updateStyle('.deallist-item-footer-price-old', {
            color: '#8f8f8f',
            fontSize: T.p(24)+'px',
            textDecoration: 'line-through'
        });
        T.updateStyle('.deallist > ul', {
            paddingBottom: T.p(80)+'px'
        });
        T.updateStyle('.loading-icon', {
            bottom: T.p(10)+'px',
            height: T.p(50)+'px',
            webkitBackgroundSize: T.p(48) + 'px ' + T.p(48) + 'px',
            backgroundSize: T.p(48) + 'px ' + T.p(48) + 'px'
        });
    }
};