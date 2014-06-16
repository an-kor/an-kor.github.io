Templates.dealsItem = function(data){
    if (data.discount > 0) {
        data.title = data.title + " -" + data.discount + "%";
    }
    return '<li onclick="Deals.showDeal('+data.id+')"><div class="deallist-item" style="background-image: url('+data.imageSrc+');"><div>' + // ontouchend="Deals.showDeal('+data.id+')"
        '<div class="deallist-item-header">'+data.title+'</div>' +
        '<div class="deallist-item-footer"><div class="deallist-item-footer">' +
        '<div class="deallist-item-footer-bought">'+data.bulk+' köpta</div>' +
        (data.timer?'<div class="deallist-item-footer-timer" data-endtime="'+data.endtime+'">'+T.getCountdownTime(data.endtime)+'</div>':'') +
        '<div class="deallist-item-footer-price '+(!data.timer?'deallist-item-without-timer':'')+'">'+((data.origPrice!=data.price && data.origPrice>0)?'<div class="deallist-item-footer-price-old">'+ T.formatNumber(data.origPrice)+' kr</div>':'')+'<div class="deallist-item-footer-price-new">'+T.formatNumber(data.price)+' kr</div></div>' +
        '</div>' +
        '</div></div></li>';
};