var Templates = {};
var Data = {
    fb: new Firebase("https://burning-heat-7084.firebaseio.com")
};
var Auth = new FirebaseSimpleLogin(Data.fb, function(){});
var Events = [];

var App = {
    data: {},
    breadcrunbs: [],
    renderPage: function(notClearEvents){
        if (App.breadcrunbs.length) {
            App.breadcrunbs[App.breadcrunbs.length-1].last = 1;
        }
        $('#header-container').html(Templates.header({
            title: App.title,
            breadcrunbs: App.breadcrunbs
        }));

        if (!notClearEvents) {
            $.map(Events, function(el){
                el.off("child_added");
                el.off("child_changed");
                el.off("child_removed");
            });
        } else {
            $.map(Events, function(el, key){
                if (key != Events.length-2) {
                    el.off("child_added");
                    el.off("child_changed");
                    el.off("child_removed");
                }
            });
        }

        var route = window.location.hash.substr(1);
        //$('.sidebar-group').find('.active').removeClass('active');
        $('.sidebar-submenu li').removeClass('active');
        $('[data-url="'+route+'"]').addClass('active');
        $('[data-url="'+route+'"]').parent().parent().addClass('active');
    },
    redirect: function(to) {
        return function(){
            console.log('redirecting to %s', to);
            setTimeout(function(){
                page(to);
            }, 0);
        }
    },
    init: function(){
        FastClick.attach(document.body);

        Templates.header = Handlebars.compile($('#header-template').html());
        Templates.content = Handlebars.compile($('#content-template').html());
        Templates.restaurantList  = Handlebars.compile($('#restaurantList-template').html());
        Templates.restaurantListElement  = Handlebars.compile($('#restaurantListElement-template').html());
        Templates.restaurantInfo  = Handlebars.compile($('#restaurantInfo-template').html());
        Templates.restaurantCreate  = Handlebars.compile($('#restaurantCreate-template').html());
        Templates.restaurantMenu  = Handlebars.compile($('#restaurantMenu-template').html());
        Templates.restaurantMenuSections  = Handlebars.compile($('#restaurantMenuSections-template').html());
        Templates.restaurantMenuSectionItems  = Handlebars.compile($('#restaurantMenuSectionItems-template').html());
        Templates.staffList = Handlebars.compile($('#staffList-template').html());
        Templates.login = Handlebars.compile($('#login-template').html());

        $('#sidebar-container').html($('#sidebar-template').html());
        //$('#header-container').html($('#header-template').html());
        //$('#content-container').html($('#content-template').html());
        Utils.initSaltkin();

        var routes = {
            '/login': Pages.login,
            '/restaurants': Pages.restaurantsList,
            '/restaurants/list': Pages.restaurantsList,
            '/restaurants/add': Pages.restaurantCreate,
            '/restaurants/:restaurantId': Pages.restaurantInfo,
            '/restaurants/:restaurantId/menu': Pages.restaurantMenu,
            '/restaurants/:restaurantId/staff': Pages.restaurantStaff
        };

        App.router = Router(routes);
        App.router.init('/login');
    }
};


window.addEventListener('DOMContentLoaded', function() {
    App.init();
    window.scrollTo( 0, 0 );
});