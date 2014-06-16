Deals.checkDealsTimer = function(){
    var timerDeals = document.querySelectorAll('#'+App.mainPageHScroll.currentPageIndex+' .deallist-item-footer-timer');
    for (var i in timerDeals) {
        if (timerDeals[i].getAttribute) {
            timerDeals[i].innerHTML = T.getCountdownTime(timerDeals[i].getAttribute("data-endtime"));
        }
    }
};