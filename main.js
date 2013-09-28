
Style={
    navHeight: 80
};
T = {
    byId: function (id){
        return document.getElementById(id);
    },
    bindReady: function(handler){
        window.onload = handler;
    },
    isAnimate: 0,
    animateScroll: function (y) {
        var offset = window.pageYOffset || document.documentElement.scrollTop, step = 50, direction = 1;
        if(this.isAnimate)
            return;
        T.isAnimate = true;

        if (y < offset) {
            direction = -1;
        }
        (function animate() {
            var top = window.pageYOffset || document.documentElement.scrollTop;
            if(direction==1 && offset >= y){
                offset = y;
                T.isAnimate = false;
            }

            if(direction==-1 && offset <= y){
                offset = y;
                T.isAnimate = false;
            }
            window.scrollTo(top, offset);
            offset += direction*step;
            if(T.isAnimate)
                setTimeout(animate, 16);
        }())
    }
};

App = {
    scroll_about: function(){
        var style = window.getComputedStyle(T.byId('msg-about'))
        T.byId('hover-div').style.left=T.byId('msg-about').offsetLeft-5 + 'px';
        T.byId('hover-div').style.width=style.width;
        T.byId('msg-about').className="hover";
        T.byId('msg-demo').className="";
        T.byId('msg-screens').className="";
    },
    scroll_demo: function(){
        var style = window.getComputedStyle(T.byId('msg-demo'))
        T.byId('hover-div').style.left=T.byId('msg-demo').offsetLeft-5 + 'px';
        T.byId('hover-div').style.width=style.width;
        T.byId('msg-about').className="";
        T.byId('msg-demo').className="hover";
        T.byId('msg-screens').className="";
    },
    scroll_screens: function(){
        var style = window.getComputedStyle(T.byId('msg-screens'))
        T.byId('hover-div').style.left=T.byId('msg-screens').offsetLeft - 5 + 'px';
        T.byId('hover-div').style.width=style.width;
        T.byId('msg-about').className="";
        T.byId('msg-demo').className="";
        T.byId('msg-screens').className="hover";
    },
    init: function(){
        //    T.byId("top").style.height = window.innerHeight + 'px';
        var checkCredits = function(top){
            var k = 1, tK = top / document.body.scrollHeight;
            if (top > window.innerHeight - 100) {
                k = 2.3;
            }
            var i = Math.round(130 + 170 * k * tK);
            if (i > 255) {
                i = 255;
            }
            T.byId("msg-credits").style.color = "rgba("+i+","+i+","+i+",0.9)"
        };
        var animRunning = 0;
        window.addEventListener('scroll',function(e) {
            var top = window.pageYOffset || document.documentElement.scrollTop;
            checkCredits(top);

            if (!animRunning) {
                if (top < window.innerHeight - 100) {
                    App.scroll_about()
                }
                if (top >= window.innerHeight - 100 && top < window.innerHeight * 2 - 100) {
                    App.scroll_demo()
                }
                if (top >= window.innerHeight*2 - 100) {
                    App.scroll_screens();
                }
            }
        });
        var ar = ['about', 'demo', 'screens'];
        for (var i in ar) {
            T.byId('msg-'+ar[i]).onclick = function(i){
                return function(e){
                    App['scroll_'+ar[i]]();
                    T.animateScroll(window.innerHeight*i);
                    animRunning = 1;
                    setTimeout(function(){
                        animRunning = 0;
                    },1000);
                    if (e) e.preventDefault();
                }
            }(i);
        }
        checkCredits(0);

        var windowH = window.innerHeight- Style.navHeight - 40;

        var samsungH = T.byId("samsung").height;
        var k = 1;
        if (samsungH > windowH) {
            k = windowH / samsungH;
            T.byId("samsung").height = Math.round(samsungH*k);
            T.byId("samsung").width = Math.round(T.byId("samsung").width*k);
            T.byId("iphone").height = Math.round(samsungH*k);
            T.byId("iphone").width = Math.round(T.byId("iphone").width*k);
        }
        var tabletH = T.byId("tablet").height;
        k = 1;
        if (tabletH > windowH) {
            k = windowH / tabletH;
            T.byId("tablet").height = Math.round(tabletH*k);
            T.byId("tablet").width = Math.round(T.byId("tablet").width*k);
        }


        var tabletTop = (windowH - tabletH) / 2;
        if (tabletTop < 0) {
            tabletTop = 0;
        }
        T.byId("tablet").style.top = tabletTop + Style.navHeight + 20 + 'px';
        T.byId("demo-frame").style.top = T.byId("tablet").offsetTop + 162*k + 'px';
        if (k < 1) {
            T.byId("tablet").style.left = (750 - T.byId("tablet").width) / 2 + 'px';
        }
        T.byId("demo-frame").style.left = T.byId("tablet").offsetLeft + 70*k + 'px';
        T.byId("demo-frame").style.height = 862*k + 'px';
        T.byId("demo-frame").style.width = 561*k + 'px';
        T.byId("demo-frame").src="http://001.taxi.taxamobile.ru:5902";
    }
};
T.bindReady(App.init);