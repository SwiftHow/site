var keystone = require('keystone');
var Link = keystone.list('Link');

function linkPage(req, res) {
    res.redirect('/link/type/framework');
}

function linkByType(req, res) {

    var view = new keystone.View(req, res);
	var locals = res.locals;
    var type = req.params.type;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'link';
    locals.linkTypes = [
        { value: 'framework' },
        { value: 'article' },
        { value: 'collection' }
    ];

    locals.type = type;

    view.on('init', function(next) {
        Link.model.find()
            .where('state', 'published')
            .where('type', type)
            .sort('-created')
            .exec(function(err, links) {
                if(err) return next(err);

                locals.links = links;
                next();
            });
    });

    view.render('link');
}

function jump(req, res, next) {
    var id = req.params.id;

    Link.model.findById(id, function(err, link) {
        if(err) return next(err);

        // redirect
        res.redirect(link.raw);

        link.hot++;
        link.save(function(err) {
            if(err) return next(err);
        });
    });
}

module.exports.linkPage = linkPage;
module.exports.linkByType = linkByType;
module.exports.jump = jump;
