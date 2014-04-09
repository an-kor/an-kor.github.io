WebMP.ApplicationController = Ember.ObjectController.extend({
    navScroller: undefined,
    asideScroller: undefined,

    refreshNavScroller: function () {
        if (this.navScroller) {
            Ember.run.next(this, function () {
                this.navScroller.refresh();
            });
        }
    },

    refreshAsideScroller: function () {
        if (this.asideScroller) {
            Ember.run.next(this, function () {
                this.asideScroller.refresh();
            });
        }
    },

    actions: {
        initNavScroller: function () {
            this.navScroller = new IScroll('#nav', {
                mouseWheel: true,
                scrollbars: true,
                fadeScrollbars: true,
                interactiveScrollbars: true,
                bounce: false,
                momentum: false,
            });
        },

        refreshNavScroller: function () {
            this.refreshNavScroller();
        },

        initAsideScroller: function () {
            this.asideScroller = new IScroll('#aside', {
                mouseWheel: true,
                scrollbars: true,
                fadeScrollbars: true,
                interactiveScrollbars: true,
                bounce: false,
                momentum: false,
            });
        },

        refreshAsideScroller: function () {
            this.refreshAsideScroller();
        }
    }
});