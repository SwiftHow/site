var keystone = require('keystone');
var Link = keystone.list('Link');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.site_title = 'SWIFT.HOW - Daily Swift Links, Swift News, iOS APP Tutorial';
	locals.meta_description = 'Swift.how will focus on apple swift language, and tell you how to build app with swift. We also collect useful links about swift frameworks, articles and apps for you.';

	view.on('init', function(next) {
        Link.model.findOne()
            .where('state', 'published')
            .sort('-created')
			.limit(1)
            .exec(function(err, link) {
                if(err) return next(err);

                locals.todayLink = link;
                next();
            });
    });

	// Render the view
	view.render('index');

};
