var Utils = {
    escapeEmail: function(email) {
        return (email || '').replace('.', ',');
    },
    unescapeEmail: function(email) {
        return (email || '').replace(',', '.');
    },
    showAlert: function(text){
        $('#alert-container > div').html(text);
        $('#alert-container').show();
    },
    hideAlert: function(text){
        $('#alert-container').hide();
    },
    initSaltkin: function(){

        "use strict";
        // Fix height
        var winHeight = $(window).height();
        var docHeight = $(document).height();
        if(winHeight > docHeight) {
            docHeight = winHeight;
        }
        $("#sidebar").css('min-height', docHeight);
        $("#content").css('min-height', docHeight);

        // Show sidebar submenu
        $(".has-submenu").click(function(e) {
            //$(this).toggleClass("active");
            $('.sidebar-group li').removeClass('active');
            $(this).closest('li').addClass('active');
        });

        // Collapse sidebar
        $("#make-compact").click(function(e) {
            //e.preventDefault();
            $("body").toggleClass("compact-sidebar");
        });

        // Toggle menu on mobile
        $("#toggle-menu").click(function(e) {
            e.preventDefault();
            $("body").removeClass("compact-sidebar");
            $("body").toggleClass("show-menu");
        });

        $("#hide-menu").click(function(e) {
            e.preventDefault();
            $("body").removeClass("compact-sidebar");
            $("body").removeClass("show-menu");
        });
        /*
         // Compact sidebar on mobiles fix
         $(window).resize(function(){
         if ($("#make-compact").css("display") == "none" ){
         $("body").removeClass("compact-sidebar");
         }
         });
         */

    }
};