var lang = 0;
Style={
    navHeight: 80
};
T = {
    byId: function (id){
        return document.getElementById(id);
    },
    bindReady: function(handler){
        window.onload = handler;
        if (navigator.language.indexOf('ru')  == -1 || location.hash =='#en') {
            document.addEventListener('DOMContentLoaded', function() {
                lang = 1;
                T.byId('msg-about').innerHTML = '<span>Info</span>';
                T.byId('msg-demo').innerHTML = '<span>Demo</span>';
                T.byId('msg-screens').innerHTML = '<span>Screens</span>';
                T.byId('msg-blog').innerHTML = '<span>Blog</span>';
                T.byId('block1-header').innerHTML = 'Taxi Driver App';
                T.byId('block1-msg').innerHTML =
                '1. GPS tracking <br/>' +
                '2. See orders on a city map <br/>' +
                '3. Built-in navigation with route planning <br/>' +
                '4. Live voice chat <br/>' +
                '5. Payment using Visa/Master Card <br/>' +
                '6. Offline mode <br/>' +
                '7. Photoreport';
                T.byId('block1-link').innerHTML = 'Scroll to live demo';

                T.byId('block2-header').innerHTML = 'Try live demo &rarr;';
                T.byId('block2-msg').innerHTML =
                        'Our application works on Android, iOS, Windows Phone platforms and in any modern browser. You can see this straight on this page. Just click on Sign in button to explore most of the features ' +
                        '(but only mobile application will give you the full experience, with features like a walkie-talkie or support for Visa/MasterCard card readers)';
                T.byId('block2-link').innerHTML = 'Scroll to screenshots';

                T.byId('footer-links').innerHTML =
                    ' <a href="#about">About app</a> ·'+
                    ' <a href="#demo">Live Demo</a> ·'+
                    ' <a href="#screens">Screens</a> ·'+
                    ' <a href="#blog">Blog</a> ·'+
                    ' <a href="#contacts">Contacts</a>'+
                    ' <a href="#ru" onclick="location.hash = \'\'; location.reload(); return false;" id="lang-switcher">In Russian</a>';
        })
        }
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
        FastClick.attach(document.body);
        if (!lang) {
            T.byId('hover-div').style.width = '125px';
            setTimeout(function(){
                T.byId('hover-div').style.transition = 'left 0.75s, width 0.75s';
            }, 100)
        } else {

            T.byId('hover-div').style.width = T.byId('msg-about').offsetWidth - 35 + 'px';
            setTimeout(function(){
                T.byId('hover-div').style.transition = 'left 0.75s, width 0.75s';
            }, 100)
        }
        var checkCredits = function(top){
            var k = 1, tK = top / document.body.scrollHeight;
            if (top > window.innerHeight - 100) {
                k = -0.8;
            }

            if (top > window.innerHeight*2 - 100) {
                k = -0.5;
            }
            var i = Math.round(130 + 70 * k * tK);
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
                if (top < window.innerHeight*0.75) {
                    App.scroll_about()
                }
                if (top >= window.innerHeight*0.75 && top < window.innerHeight + window.innerHeight*0.75) {
                    App.scroll_demo()
                }
                if (top >= document.body.scrollHeight - 1700 || document.body.scrollHeight - top < window.innerHeight + 100 ) {
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

        T.byId("tablet").style.left = 470 + 'px';
        if (k < 1) {
            T.byId("tablet").style.left = 450 + (750 - T.byId("tablet").width) / 2 + 'px';
        }
        T.byId("demo-frame").style.left = T.byId("tablet").offsetLeft + 70*k + 'px';
        T.byId("demo-frame").style.height = 862*k + 'px';
        T.byId("demo-frame").style.width = 561*k + 'px';
        T.byId("demo-frame").src="http://101.taxi.taxamobile.ru:5902";
    }
};
T.bindReady(App.init);