var keystone = require('keystone');
var New = keystone.list('New');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'news';

	view.on('init', function(next) {
		New.model.find()
            .sort('-created')
			.populate('link')
			.populate('app')
            .exec(function(err, news) {
                if(err) return next(err);

                locals.news = news;
                next();
            });
	});

	// Render the view
	view.render('news');

};
