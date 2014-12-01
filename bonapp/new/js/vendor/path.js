var Router = {
    'version': "0.8.4",
    'map': function (path) {
        if (Router.routes.defined.hasOwnProperty(path)) {
            return Router.routes.defined[path];
        } else {
            return new Router.core.route(path);
        }
    },
    'root': function (path) {
        Router.routes.root = path;
    },
    'rescue': function (fn) {
        Router.routes.rescue = fn;
    },
    'history': {
        'initial':{}, // Empty container for "Initial Popstate" checking variables.
        'pushState': function(state, title, path){
            if(Router.history.supported){
                if(Router.dispatch(path)){
                    history.pushState(state, title, path);
                }
            } else {
                if(Router.history.fallback){
                    window.location.hash = "#" + path;
                }
            }
        },
        'popState': function(event){
            var initialPop = !Router.history.initial.popped && location.href == Router.history.initial.URL;
            Router.history.initial.popped = true;
            if(initialPop) return;
            Router.dispatch(document.location.pathname);
        },
        'listen': function(fallback){
            Router.history.supported = !!(window.history && window.history.pushState);
            Router.history.fallback  = fallback;

            if(Router.history.supported){
                Router.history.initial.popped = ('state' in window.history), Router.history.initial.URL = location.href;
                window.onpopstate = Router.history.popState;
            } else {
                if(Router.history.fallback){
                    for(route in Router.routes.defined){
                        if(route.charAt(0) != "#"){
                          Router.routes.defined["#"+route] = Router.routes.defined[route];
                          Router.routes.defined["#"+route].path = "#"+route;
                        }
                    }
                    Router.listen();
                }
            }
        }
    },
    'match': function (path, parameterize) {
        var params = {}, route = null, possible_routes, slice, i, j, compare;
        for (route in Router.routes.defined) {
            if (route !== null && route !== undefined) {
                route = Router.routes.defined[route];
                possible_routes = route.partition();
                for (j = 0; j < possible_routes.length; j++) {
                    slice = possible_routes[j];
                    compare = path;
                    if (slice.search(/:/) > 0) {
                        for (i = 0; i < slice.split("/").length; i++) {
                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
                            }
                        }
                    }
                    if (slice === compare) {
                        if (parameterize) {
                            route.params = params;
                        }
                        return route;
                    }
                }
            }
        }
        return null;
    },
    'dispatch': function (passed_route) {
        var previous_route, matched_route;
        if (Router.routes.current !== passed_route) {
            Router.routes.previous = Router.routes.current;
            Router.routes.current = passed_route;
            matched_route = Router.match(passed_route, true);

            if (Router.routes.previous) {
                previous_route = Router.match(Router.routes.previous);
                if (previous_route !== null && previous_route.do_exit !== null) {
                    previous_route.do_exit();
                }
            }

            if (matched_route !== null) {
                matched_route.run();
                return true;
            } else {
                if (Router.routes.rescue !== null) {
                    Router.routes.rescue();
                }
            }
        }
    },
    'listen': function () {
        var fn = function(){ Router.dispatch(location.hash); }

        if (location.hash === "") {
            if (Router.routes.root !== null) {
                location.hash = Router.routes.root;
            }
        }

        // The 'document.documentMode' checks below ensure that RouterJS fires the right events
        // even in IE "Quirks Mode".
        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
            window.onhashchange = fn;
        } else {
            setInterval(fn, 50);
        }

        if(location.hash !== "") {
            Router.dispatch(location.hash);
        }
    },
    'core': {
        'route': function (path) {
            this.path = path;
            this.action = null;
            this.do_enter = [];
            this.do_exit = null;
            this.params = {};
            Router.routes.defined[path] = this;
        }
    },
    'routes': {
        'current': null,
        'root': null,
        'rescue': null,
        'previous': null,
        'defined': {}
    }
};
Router.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    'run': function () {
        var halt_execution = false, i, result, previous;

        if (Router.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (Router.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < Router.routes.defined[this.path].do_enter.length; i++) {
                    result = Router.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution) {
            Router.routes.defined[this.path].action();
        }
    }
};