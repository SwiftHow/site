var keystone = require('keystone');
var New = keystone.list('New');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'news';

	// Render the view
	view.render('news');

};
