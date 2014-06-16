App.showExternalPage = function(title, src){
    if (T.isIOS) {
        var safari = /safari/i.test( navigator.userAgent );
        if (safari) src=src.replace("device=app","device=no");
        src += "&is_touch=1";
        setTimeout(function(){
            location.href=src;
        }, 500);
        return false;

    }
    if (App.addPage()) {
        var currentEl, newEl;
        currentEl = T.byId('pages-current');
        newEl = document.createElement("div");
        newEl.id = "pages-iframe";
        newEl.style.width = T.w()+'px';
        var template = T.byId('iframe-page-template').innerHTML;
        template = template.replace('%TITLE%', title);
        template = template.replace('src=""', 'src="'+src+'"');
        template = template.replace('onload=""', 'onload="T.query(\'.content-loading-iframe\').style.display=\'none\'; this.style.display=\'block\'"');
        newEl.innerHTML = template;
        currentEl.parentNode.appendChild(newEl);
        /*if (T.isIOS) {
            var wrapper = T.query('.iframe-wrapper');
            wrapper.scrollTop = 1;
            wrapper.bottomReached = 0;
            wrapper.addEventListener("scroll",function(e){
                if (!wrapper.bottomReached) {
                    if (wrapper.scrollTop == 0) {
                        wrapper.scrollTop = 1
                    }
                    if(wrapper.scrollTop > wrapper.scrollHeight - T.h()) {
                        wrapper.bottomReached = 1;
                        setTimeout(function(){
                            wrapper.bottomReached = 0;
                        },300);
                        wrapper.scrollTop = wrapper.scrollTop - 1;
                    }
                }
            });
        }*/
        T.initHover(T.query('.top-menu-back-btn'), Styles.footer.bgColorHover);
    }
};