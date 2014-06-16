Deals.showBuyPage = function(dealId){
    var data = Deals.loadedDeals[dealId];
    if (ga) {
        ga("send", "pageview", {
          'page': "/#/buy/"+dealId,
          'title': data.title
        });
        /*
        var trId = data.id + "_" + Math.ceil(Math.random()*100000);
        ga('ecommerce:addTransaction', {
          'id': trId,
          'affiliation': data.title,
          'revenue': data.price
        });

        ga('ecommerce:addItem', {
          'id': trId,
          'name': data.title,
          'sku': data.id
        });

        ga('ecommerce:send');
        */
    }

    App.showExternalPage(data.title, Messages.buySrc.replace("%DEAL_ID%", data.id));
    App.changeHash('/buy/'+dealId);
};