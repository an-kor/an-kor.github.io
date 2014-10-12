define(['hbs!js/map/map'], function(template) {
    var $ = Dom7;

	function render(params) {
        $('.contacts-list ul').html(template(params.model));
    }

	function reRender(params) {
	}

    return {
        render: render,
		reRender: reRender
    };
});