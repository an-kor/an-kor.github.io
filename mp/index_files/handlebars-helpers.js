Ember.Handlebars.registerHelper('ifeq', function (val1, val2, options) {
    if (this.get(val1) == val2) return options.fn(this);
    return options.inverse(this);
});