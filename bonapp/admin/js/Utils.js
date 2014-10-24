var Utils = {
    escapeEmail: function(email) {
        return (email || '').replace(/\./g, ',');
    },
    unescapeEmail: function(email) {
        return (email || '').replace(/,/g, '.');
    },
    showAlert: function(text){
        $('#alert-container > div').html(text);
        $('#alert-container').show();
    },
    hideAlert: function(text){
        $('#alert-container').hide();
    },
    sortTable: function(){
        var rows = $('#ordersList tbody tr');
        rows.sort(function(a, b){
            var c = $(a).find('.created_at:first').attr('data-time');
            var d = $(b).find('.created_at:first').attr('data-time');
            return (c == d) ? 0 : ((c > d) ? -1 : 1);
        });
        var result = [];
        $('body').append('<div id="tmp"></div>')
        $.each(rows, function(k, row){
            $('#tmp').append(row);
            result.push($('#tmp').html());
            $('#tmp').empty();
        });
        $('#tmp').remove();

        $('#ordersList tbody').html(result.join());
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
            $("#h-logo").toggle();
            $("body").toggleClass("compact-sidebar");
        });

        // Toggle menu on mobile
        $("#toggle-menu").click(function(e) {
            e.preventDefault();
            $("#h-logo").toggle();
            $("body").toggleClass("compact-sidebar");
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