WebMP.InfiniteScrollView = Ember.Mixin.create({
    didScroll: function(){
        if (this.isScrolledToBottom()) {
            this.get('controller').send('loadMore');            
        }
    },
    isScrolledToBottom: function(){
        if (Ember.$('body').height() <= (Ember.$(window).height() + Ember.$(window).scrollTop() + ($(document).height() - $('.mp-col:last').position().top)))
            return true;        
        return false;
    },
    didInsertElement: function(){        
        $(window).on('scroll', Ember.$.proxy(this.didScroll, this));        
    },
    willDestroyElement: function(){        
        $(window).off('scroll', Ember.$.proxy(this.didScroll, this));        
    }
});