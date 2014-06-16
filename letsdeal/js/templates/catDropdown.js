Templates.catDropdown = function(categories, callback){
    var select = document.createElement("select");
    select.className = "categories-dropdown";
    var option = document.createElement("option");
    option.value = "";
    option.selected = true;
    option.innerHTML = Messages.seeAllCategories;
    select.appendChild(option);
    for (var i in categories) {
        option = document.createElement("option");
        option.value = categories[i].id;
        option.innerHTML = categories[i].name;
        select.appendChild(option);
    }
    select.onchange = function(){
        callback(this.value);
    };
    select.ontouchend = function(){
        this.firstChild.innerHTML = Messages.viewAll;
    };
    select.onclick = function(){
        this.firstChild.innerHTML = Messages.viewAll;
    };
    return select;
};