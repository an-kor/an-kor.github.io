/* Get a list of deals via AJAX request to the server
  * @param section - section's ID
  * @param from - index of a first element
  * @param limit - how many deals to load
  * @param callback - callback function for success response
  * @param errorCallback - callback function for the error response
  */
Deals.loadDeals = function(section, from, limit, callback, errorCallback){
    var dealsText = '', category = 0;
    var sections = App.sections.concat(App.cities);
    for (var i in sections) {
        if (sections[i].id == section && sections[i].currentCategory) {
            category = sections[i].currentCategory;
        }
    }
    if (!limit) {
        limit = App.numberOfDealsPerLoad;
    }
    T.request('deals', function(data){
        try {
            if (data.length) {
                for (var i in data) {
                    Deals.loadedDeals[data[i].id] = data[i];
                    dealsText += Templates.dealsItem(data[i]);
                }
                var dealsElement = document.createElement("div");
                dealsElement.innerHTML = dealsText;
                callback(dealsElement);
            } else {
                callback(false);
            }
        } catch (e) {
            console.error(e);
            errorCallback();
        }
    }, {
        section: section,
        category: category,
        from: from,
        limit: limit
    }, function(){
        errorCallback(false);
    });
};