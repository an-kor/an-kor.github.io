Templates.prepareSplash = function(){
    T.updateStyle('#splash', {
        'background-size':  T.p(559)+'px '+ T.px(359),
        'background-position':  '50% 150px'
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
};